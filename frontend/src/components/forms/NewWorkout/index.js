import { useSelector } from 'react-redux'

export default function NewWorkout() {
	const categories = useSelector(state => state.exercise)
	console.log()
	return (
		<form className="new-workout-form">
			<h2>Add New Workout</h2>
			<label htmlFor="">
				Exercise
				<input type="text" list="exercise" />
				<datalist id="exercise">
					<option value="HARDCODE Pushups" />
					<option value="HARDCODE Pullups" />
				</datalist>
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
