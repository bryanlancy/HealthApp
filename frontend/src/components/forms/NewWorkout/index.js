import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function NewWorkout() {
	const categories = useSelector(state => state.exercise)

	const [category, setCategory] = useState(Object.keys(categories)[0])
	const [categoryOptions, setCategoryOptions] = useState([])
	const [exerciseOptions, setExerciseOptions] = useState([])

	useEffect(() => {
		let categoryList = []
		for (const id in categories) {
			const { label } = categories[id]
			const formatted = label[0].toUpperCase() + label.slice(1)
			categoryList.push(
				<option key={`category-${id}`} value={id}>
					{formatted}
				</option>
			)
		}
		setCategoryOptions(categoryList)
	}, [categories])
	useEffect(() => {
		const exercises = categories[category].exercises
		let exerciseList = []
		for (const id in exercises) {
			const { label } = exercises[id]
			const formatted = label[0].toUpperCase() + label.slice(1)
			exerciseList.push(
				<option key={`exercise-${id}`} value={id}>
					{formatted}
				</option>
			)
		}
		setExerciseOptions(exerciseList)
	}, [categories, category])

	return (
		<form className="new-workout-form">
			<h2>Add New Workout</h2>
			<label htmlFor="">
				Category
				<select value={category} onChange={e => setCategory(e.target.value)} id="exercise">
					{categoryOptions}
				</select>
			</label>
			<label htmlFor="">
				Exercise
				<select id="exercise">{exerciseOptions}</select>
			</label>
			<label htmlFor="">
				Reps
				<input type="text" />
			</label>
			<button type="submit">Add Workout</button>
		</form>
	)
}
