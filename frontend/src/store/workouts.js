import { csrfFetch } from './csrf'

const LOAD_WORKOUTS = 'exercise/LOAD_WORKOUTS'

const loadWorkouts = categories => {
	return {
		type: LOAD_WORKOUTS,
		payload: categories,
	}
}

export const addWorkout = workout => async dispatch => {
	const res = await csrfFetch('/api/workouts', {
		method: 'POST',
		body: JSON.stringify({ ...workout }),
	})
	if (res.ok) {
		//! ADD TO REDUX STORE!!
		const data = await res.json()
		return { ok: true }
	} else return { ok: false }
}

export const populateWorkouts = () => async dispatch => {
	const res = await csrfFetch('/api/workouts')
	if (res.ok) {
		const { workouts } = await res.json()
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
