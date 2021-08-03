import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateSorted, populateWorkouts } from '../../store/workouts'

export default function TestWorkout() {
	const dispatch = useDispatch()
	const history = useHistory()
	const { workouts, sortedWorkouts2 } = useSelector(state => state.workouts)
	const [sortedWorkouts, setSortedWorkouts] = useState([])
	const [sortInput, setSortInput] = useState('none')
	const [sortAsc, setSortAsc] = useState(false)

	function formatString(string) {
		return string[0].toUpperCase() + string.slice(1)
	}

	useEffect(() => {
		function sortWorkouts(arr, prop) {
			function split(arr, l, r) {
				const pivot = arr[Math.floor((l + r) / 2)]

				function getValue(id) {
					const value = workouts[id][prop]
					switch (prop) {
						case 'date':
							return new Date(value).getTime()
						case 'exercise':
							return value.label
						default:
							return value
					}
				}

				while (l <= r) {
					while (sortAsc ? getValue(arr[l]) < getValue(pivot) : getValue(arr[l]) > getValue(pivot)) {
						l++
					}
					while (sortAsc ? getValue(arr[r]) > getValue(pivot) : getValue(arr[r]) < getValue(pivot)) {
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
		const workoutIds = Object.keys(workouts).map(x => parseInt(x))
		if (workoutIds.length) {
			const sortedIds = sortWorkouts(workoutIds, sortInput)
			dispatch(updateSorted(sortedIds, sortInput))
			setSortedWorkouts(sortInput !== 'none' ? sortedIds : workoutIds)
		}
	}, [workouts, sortInput, sortAsc])

	useEffect(() => {
		dispatch(populateWorkouts())
	}, [dispatch])

	function timestamp(date) {
		const dateObj = new Date(date)
		return dateObj.toLocaleDateString()
	}

	const workoutList = useMemo(() => {
		function handleExerciseClick(exerciseId) {
			history.push(`/exercise/${exerciseId}`)
		}

		return sortedWorkouts.map(id => {
			const { reps, calories, exercise, date } = workouts[id]
			return (
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
		})
	}, [history, sortedWorkouts, workouts])

	const sortOptions = useMemo(() => {
		const workoutIds = Object.keys(workouts)
		if (workoutIds.length) {
			const workout = workoutIds[0]
			const keys = Object.keys(workouts[workout])
			return keys.sort().map(key => {
				if (key === 'date') setSortInput('date')
				return (
					<option key={`sort-${key}`} value={key}>
						{formatString(key)}
					</option>
				)
			})
		}
	}, [workouts])

	return (
		<div className="workouts">
			<div className="workouts__header">
				<h1>Workouts</h1>
				<div className="workouts__sort">
					<label>
						Sort by
						<select
							value={sortInput}
							onChange={e => {
								setSortInput(e.target.value)
							}}
						>
							{sortOptions}
							<option value="none">None</option>
						</select>
					</label>
					<i
						onClick={() => {
							setSortAsc(!sortAsc)
						}}
						className={`fad fa-arrow-circle-up fa-rotate-${sortAsc ? '0' : '180'}`}
						style={{ transition: 'all .5s ease' }}
					></i>
				</div>
			</div>
			<div className="workouts__list">{workoutList}</div>
		</div>
	)
}
