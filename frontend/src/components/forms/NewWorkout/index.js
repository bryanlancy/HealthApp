import { useSelector } from 'react-redux'

export default function NewWorkout() {
	const categories = useSelector(state => state.exercise)

	let categoryOptions = []
	for (const id in categories) {
		const { label } = categories[id]
		const formatted = label[0].toUpperCase() + label.slice(1)
		categoryOptions.push(
			<option key={`exercise-${id}`} value={id}>
				{formatted}
			</option>
		)
	}

	return (
		<form className="new-workout-form">
			<h2>Add New Workout</h2>
			<label htmlFor="">
				Exercise
				<select id="exercise">{categoryOptions}</select>
			</label>
			<label htmlFor="">
				Reps
				<input type="text" />
			</label>
			<label htmlFor="">
				MET Value of this workout
				<input type="text" />
			</label>
			<button type="submit">Add Workout</button>
		</form>
	)
}
