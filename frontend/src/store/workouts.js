import { csrfFetch } from './csrf'

const LOAD_WORKOUTS = 'workouts/LOAD_WORKOUTS'
const SET_SORTED = 'workouts/SET_SORTED'

const loadWorkouts = (workouts, sortedWorkouts) => {
	return {
		type: LOAD_WORKOUTS,
		payload: { workouts, sortedWorkouts },
	}
}

const setSorted = (ids, prop) => {
	return {
		type: SET_SORTED,
		payload: { [prop]: ids },
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

export const updateSorted = (arr, prop) => async dispatch => {
	dispatch(setSorted(arr, prop))
}

export const populateWorkouts = () => async dispatch => {
	const res = await csrfFetch('/api/workouts')

	let sortedWorkouts = { default: [1, 2, 3, 4, 5] }





	if (res.ok) {
		const { workouts } = await res.json()
		dispatch(loadWorkouts(workouts, sortedWorkouts))
	}
}
const initialState = { workouts: {}, sortedWorkouts: {} }

export default function workoutsReducer(state = initialState, action) {
	let newState
	switch (action.type) {
		case LOAD_WORKOUTS:
			return Object.assign({}, state, action.payload)
		case SET_SORTED:
			newState = Object.assign({}, state)
			newState.sortedWorkouts = {
				...newState.sortedWorkouts,
				...action.payload,
			}
			return newState
		default:
			return state
	}
}
