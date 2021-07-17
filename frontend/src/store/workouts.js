import { csrfFetch } from './csrf'

const LOAD_WORKOUTS = 'exercise/LOAD_EXERCISES'

const loadWorkouts = categories => {
	return {
		type: LOAD_WORKOUTS,
		payload: categories,
	}
}

export const populateWorkouts = () => async dispatch => {
	const res = await csrfFetch('/api/categories')
	if (res.ok) {
		const { workouts } = await res.json()
		console.log(workouts)
		dispatch(loadWorkouts(workouts))
	}
}
const initialState = {}

export default function workoutsReducer(state = initialState, action) {
	let newState
	switch (action.type) {
		case LOAD_WORKOUTS:
			return Object.assign({}, state, action.payload)

		default:
			return state
	}
}