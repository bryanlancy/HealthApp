import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { populateWorkouts } from '../../store/workouts'

export default function TestWorkout() {
	const dispatch = useDispatch()
	const history = useHistory()
	const workouts = useSelector(state => state.workouts)
	const [sortedWorkouts, setSortedWorkouts] = useState([])

	function sortWorkouts(arr, prop) {
		console.log(arr, prop)
		function split(arr, l, r) {
			const pivot = arr[Math.floor((l + r) / 2)]
			console.log(pivot)
			console.log(l)
			console.log(r)
			while (l <= r) {
				while (arr[l] < pivot) {
					l++
				}
				while (arr[r] > pivot) {
					r--
				}
				if (l <= r) {
					const t = arr[l]
					arr[l] = arr[r]
					arr[r] = t
					l++
					r--
				}
			}
			return l
		}
		function quickSort(arr, l, r) {
			if (arr.length > 1) {
				let index = split(arr, l, r)
				if (l < index - 1) {
					quickSort(arr, l, index - 1)
				}
				if (index < r) {
					quickSort(arr, index, r)
				}
			}
			return arr
		}
		return quickSort(arr, 0, arr.length - 1)
	}

	useEffect(() => {
		const workoutIds = Object.keys(workouts).map(x => parseInt(x))
		if (workoutIds.length) {
			setSortedWorkouts(sortWorkouts(workoutIds, 'date'))
		}
	}, [workouts])
	useEffect(() => {
		console.log(sortedWorkouts)
	}, [sortedWorkouts])

	useEffect(() => {
		dispatch(populateWorkouts())
	}, [dispatch])

	function timestamp(date) {
		const dateObj = new Date(date)
		return dateObj.toLocaleDateString()
	}

	let workoutList = useMemo(() => {
		function handleExerciseClick(exerciseId) {
			history.push(`/exercise/${exerciseId}`)
		}
		let list = []
		for (const id in workouts) {
			if (Object.hasOwnProperty.call(workouts, id)) {
				const { reps, calories, exercise, date } = workouts[id]

				list.push(
					<div key={`workout-${id}`} className="workout">
						<div className="workout__row">
							<p className="workout__exercise" onClick={() => handleExerciseClick(exercise.id)}>
								{exercise.label}
							</p>
							<p>{timestamp(date)}</p>
						</div>
						<div className="workout__stats">
							<div className="workout__row">
								<b>Reps</b>
								<p>{reps}</p>
							</div>
							<div className="workout__row">
								<b>
									Calories <i className="fad fa-fire"></i>
								</b>
								<p>{calories.toFixed(1)}</p>
							</div>
						</div>
					</div>
				)
			}
		}
		return list
	}, [workouts, history])

	return (
		<div className="workouts">
			<h1>Test Workouts</h1>
			<div className="workouts__list">{workoutList}</div>
		</div>
	)
}
