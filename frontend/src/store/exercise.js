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
const addExercise = (exercise, categoryId) => {
	return {
		type: ADD_EXERCISE,
		payload: { exercise, categoryId },
	}
}

export const newCategory = label => async dispatch => {
	const res = await csrfFetch('/api/categories', { method: 'POST', body: JSON.stringify({ label }) })
	if (res.ok) {
		const { category } = await res.json()
		console.log(category)
		const { id, label } = category
		dispatch(addCategory({ [id]: { label, exercises: [] } }))
		return id
	} else return null
}

export const newExercise = (categoryId, exercise) => async (dispatch, getState) => {
	const existingCategories = Object.keys(getState().exercise.categories)
	if (!existingCategories.includes(categoryId.toString())) {
		console.log('newCategory')
		categoryId = await dispatch(newCategory(categoryId))
	}
	const response = await csrfFetch('/api/exercises', { method: 'POST', body: JSON.stringify({ categoryId, ...exercise }) })
	if (response.ok) {
		const data = await response.json()
		const { id: exerciseId, label, image, met, duration, description, quantity } = data.exercise
		dispatch(addExercise({ [exerciseId]: { label, description, met, duration, image, quantity } }, parseInt(categoryId)))
		return { ok: true, category: { id: categoryId } }
	}
}
export const populateExercise = () => async dispatch => {
	const initialState = {}
	const resCategories = await csrfFetch('/api/categories')
	const resExercises = await csrfFetch('/api/exercises')
	if (resCategories.ok) {
		const { categories } = await resCategories.json()
		initialState.categories = categories
	}
	if (resExercises.ok) {
		const { exercises } = await resExercises.json()
		initialState.exercises = exercises
	}
	dispatch(loadExercises(initialState))
}
const initialState = {
	//! CHANGE TO THIS STRUCTURE
	/*
	categories: {
		categoryId1: {
			label: '',
			exercises: [id1,id2,id3]
		},
		categoryId2: {
			exercises: [id1,id2,id3]
		},
	},
	exercises: {
		exerciseId1: {
			description: '',
			image: '',
			met: 0,
			quantity: 'reps'
		},
		exerciseId2: {
			description: '',
			image: '',
			met: 0,
			quantity: 'reps'
		}
	}
	*/
}

export default function exerciseReducer(state = initialState, action) {
	let newState
	switch (action.type) {
		case ADD_CATEGORY:
			newState = Object.assign({}, state)
			newState.categories = {
				...newState.categories,
				...action.payload,
			}
			return newState
		case ADD_EXERCISE:
			newState = Object.assign({}, state)

			const { exercise, categoryId } = action.payload
			console.log(exercise, categoryId)
			const exerciseId = parseInt(Object.keys(exercise)[0])
			newState.categories = {
				...newState.categories,
				[categoryId]: {
					...newState.categories[categoryId],
					exercises: [...newState.categories[categoryId]?.exercises, exerciseId],
				},
			}
			newState.exercises = {
				...newState.exercises,
				...exercise,
			}
			return newState
		case LOAD_EXERCISES:
			return Object.assign({}, state, action.payload)

		default:
			return state
	}
}
