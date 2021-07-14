import { csrfFetch } from './csrf'

const ADD_EXERCISE = 'exercise/ADD_EXERCISE'

const addExercise = exercise => {
	return {
		type: ADD_EXERCISE,
		payload: exercise,
	}
}
export const newExercise = (category, exercise) => async dispatch => {
	const response = await csrfFetch('/api/exercises', { method: 'POST' })
	// const data = await response.json()
	const exerciseId = Math.random()
	dispatch(addExercise({ category: category.toLowerCase(), exercise: { [exerciseId]: exercise } }))
	return { ok: true }
}
const initialState = {
	123456789: {
		label: 'pushups',
		exercises: {
			exerciseID1: {
				label: 'Diamond Pushup',
				description: 'Thumbs and pointer fingers should touch.',
				met: 1.2,
				image: '',
			},
			exerciseID2: {
				label: 'Standard',
				description: 'Normal',
				met: 1.0,
				image: '',
			},
		},
	},
}

export default function exerciseReducer(state = initialState, action) {
	let newState
	switch (action.type) {
		case ADD_EXERCISE:
			const { category, exercise } = action.payload
			newState = Object.assign({}, state)
			newState[category] = {
				...newState[category],
				exercises: {
					...(newState[category] ? newState[category].exercises : {}),
					...exercise,
				},
			}

			return newState
		default:
			return state
	}
}
