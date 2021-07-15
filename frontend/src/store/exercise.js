import { csrfFetch } from './csrf'

const ADD_CATEGORY = 'exercise/ADD_CATEGORY'
const ADD_EXERCISE = 'exercise/ADD_EXERCISE'
const LOAD_EXERCISES = 'exercise/LOAD_EXERCISES'

const loadExercises = categories => {
	return {
		type: LOAD_EXERCISES,
		payload: categories,
	}
}

const addCategory = category => {
	return {
		type: ADD_CATEGORY,
		payload: category,
	}
}
const addExercise = exercise => {
	return {
		type: ADD_EXERCISE,
		payload: exercise,
	}
}

export const newCategory = label => async dispatch => {
	const res = await csrfFetch('/api/categories', { method: 'POST', body: JSON.stringify({ label }) })
	if (res.ok) {
		const { category } = await res.json()
		const { id, label } = category
		dispatch(addCategory({ [id]: { label } }))
		return id
	} else return null
}

export const newExercise = (categoryId, exercise) => async (dispatch, getState) => {
	const existingCategories = Object.keys(getState().exercise)

	if (!existingCategories.includes(categoryId.toString())) {
		categoryId = await dispatch(newCategory(categoryId))
	}
	const response = await csrfFetch('/api/exercises', { method: 'POST', body: JSON.stringify({ ...exercise, categoryId }) })
	if (response.ok) {
		const data = await response.json()
		const { id: exerciseId, label, image, met, duration, description } = data.exercise
		dispatch(addExercise({ categoryId, exercise: { [exerciseId]: { label, description, met, duration, image } } }))
		return { ok: true, category: { id: categoryId } }
	}
}
export const populateExercise = () => async dispatch => {
	const res = await csrfFetch('/api/categories')
	if (res.ok) {
		const { categories } = await res.json()
		dispatch(loadExercises(categories))
	}
}
const initialState = {}

export default function exerciseReducer(state = initialState, action) {
	let newState
	switch (action.type) {
		case ADD_CATEGORY:
			return Object.assign({}, state, action.payload)
		case ADD_EXERCISE:
			const { categoryId, exercise } = action.payload
			newState = Object.assign({}, state)
			newState[categoryId] = {
				...newState[categoryId],
				exercises: {
					...(newState[categoryId] ? newState[categoryId].exercises : {}),
					...exercise,
				},
			}
			return newState
		case LOAD_EXERCISES:
			return Object.assign({}, state, action.payload)

		default:
			return state
	}
}
