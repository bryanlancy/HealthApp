import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

export default function NewWorkout() {
	const categories = useSelector(state => state.exercise)

	const [category, setCategory] = useState(Object.keys(categories)[0])
	const [exercise, setExercise] = useState(0)

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

	useEffect(() => {
		const obj = categories[category]?.exercises[exercise]
		if (obj) {
			console.log(obj)
			console.log(exercise)
		}
	}, [exercise, category, categories])

	return (
		<form className="new-workout-form">
			<h2>Add New Workout</h2>
			<section>
				<h3>Select Workout</h3>
				<label htmlFor="">
					Category
					<select value={category} onChange={e => setCategory(e.target.value)} id="exercise">
						{categoryOptions}
					</select>
				</label>
				<label htmlFor="">
					Exercise
					<select value={exercise} onChange={e => setExercise(e.target.value)} id="exercise">
						{exerciseOptions}
					</select>
				</label>
			</section>
			<section>
				<h3>{}</h3>
				<label htmlFor="">
					Reps
					<input type="text" />
				</label>
			</section>
			<button type="submit">Add Workout</button>
		</form>
	)
}
