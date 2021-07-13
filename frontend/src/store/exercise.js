import { csrfFetch } from './csrf'

const ADD_EXERCISE = 'exercise/ADD_EXERCISE'

const setUser = exercise => {
	return {
		type: ADD_EXERCISE,
		payload: exercise,
	}
}
export const restoreUser = () => async dispatch => {
	const response = await csrfFetch('/api/session')
	const data = await response.json()
	dispatch(setUser(data.user))
	return response
}
const initialState = {
	pushups: {
		id: 123456789,
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
			newState[category] = { ...newState.category, exercise }
			return newState
		default:
			return state
	}
}
