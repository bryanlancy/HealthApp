import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { populateWorkouts } from '../../store/workouts'

export default function TestWorkout() {
	const dispatch = useDispatch()
	const history = useHistory()
	const workouts = useSelector(state => state.workouts)

	useEffect(() => {
		dispatch(populateWorkouts())
	}, [dispatch])

	function timestamp(date) {
		const dateObj = new Date(date)
		return dateObj.toLocaleDateString()
	}

	function handleExerciseClick(exerciseId) {
		history.push(`/exercise/${exerciseId}`)
	}

	let workoutList = useMemo(() => {
		let list = []
		for (const id in workouts) {
			if (Object.hasOwnProperty.call(workouts, id)) {
				const { reps, calories, exercise, date } = workouts[id]

				list.push(
					<div key={`workout-${id}`} className="workout">
						<div className="workout__row">
							<div>
								<p onClick={() => handleExerciseClick(exercise.id)}>{exercise.label}</p>
								<p>Reps: {reps}</p>
							</div>
							<p>{timestamp(date)}</p>
						</div>
						<div className="workout__row">
							<p>Calories Burned: {calories.toFixed(1)}</p>
						</div>
					</div>
				)
			}
		}
		return list
	}, [workouts])

	return (
		<>
			<h1>Test Workouts</h1>
			<div className="workouts">{workoutList}</div>
		</>
	)
}
