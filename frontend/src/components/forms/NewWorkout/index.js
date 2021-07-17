import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addWorkout } from '../../../store/workouts'

export default function NewWorkout() {
	const categories = useSelector(state => state.exercise)
	const dispatch = useDispatch()

	const [category, setCategory] = useState(Object.keys(categories)[0])
	const [exerciseId, setExerciseId] = useState(0)
	const [reps, setReps] = useState(0)

	const categoryOptions = useMemo(() => {
		let list = []
		for (const id in categories) {
			const { label } = categories[id]
			const formatted = label[0].toUpperCase() + label.slice(1)
			list.push(
				<option key={`exercise-${id}`} value={id}>
					{formatted}
				</option>
			)
			if (list.length === 1) setCategory(id)
		}
		return list
	}, [categories])

	const exerciseOptions = useMemo(() => {
		let list = []
		const exercises = categories[category]?.exercises
		for (const id in exercises) {
			const { label } = exercises[id]
			const formatted = label[0].toUpperCase() + label.slice(1)
			list.push(
				<option key={`exercise-${id}`} value={id}>
					{formatted}
				</option>
			)
		}
		return list
	}, [category, categories])

	function resetForm() {
		setReps(0)
		setExerciseId(0)
	}

	async function handleSubmit(e) {
		e.preventDefault()
		const res = await dispatch(addWorkout({ exerciseId, reps }))
		if (res.ok) {
			resetForm()
		}
	}

	return (
		<form onSubmit={handleSubmit} className="new-workout-form">
			<h2>Add New Workout</h2>

			<h3>Select Workout</h3>
			<label htmlFor="">
				Category
				<select value={category} onChange={e => setCategory(e.target.value)} id="exercise">
					{categoryOptions}
				</select>
			</label>
			<label htmlFor="">
				Exercise
				<select value={exerciseId} onChange={e => setExerciseId(e.target.value)} id="exercise">
					<option value="0">Select Exercise</option>
					{exerciseOptions}
				</select>
			</label>

			<label htmlFor="">
				Reps
				<input value={reps} onChange={e => setReps(e.target.value)} type="text" />
			</label>

			<button type="submit">Add Workout</button>
		</form>
	)
}
