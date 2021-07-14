import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newExercise } from '../../../store/exercise'

export default function NewExercise() {
	const dispatch = useDispatch()
	const categories = useSelector(state => state.exercise)

	const [category, setCategory] = useState(Object.keys(categories)[0] || 'new')
	const [newCategory, setNewCategory] = useState('')
	const [variation, setVariation] = useState('')
	const [met, setMet] = useState(0.0)
	const [label, setLabel] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')

	function resetForm() {
		setCategory('')
		setNewCategory('')
		setVariation('')
		setMet(0)
		setLabel('')
		setDescription('')
		setImage('')
	}

	async function handleSubmit(e) {
		e.preventDefault()
		const exercise = {
			label,
			description,
			met,
			image,
		}
		const response = await dispatch(newExercise(category !== 'new' ? category : newCategory, exercise))
		if (response.ok) resetForm()
	}

	return (
		<form onSubmit={handleSubmit} className="new-exercise-form">
			<h2>Add New Exercise</h2>
			<label htmlFor="">
				Category
				<select value={category} name="" id="" onChange={e => setCategory(e.target.value)}>
					{Object.keys(categories).map(cat => {
						const { label } = categories[cat]
						return (
							<option key={cat} value={cat}>
								{label[0].toUpperCase() + label.slice(1)}
							</option>
						)
					})}
					<option value="new">New</option>
				</select>
			</label>
			{category === 'new' && (
				<label htmlFor="">
					New Category
					<input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
				</label>
			)}
			<label htmlFor="">
				Label
				<input type="text" value={label} onChange={e => setLabel(e.target.value)} required />
			</label>
			<label htmlFor="">
				MET
				<input type="number" value={met} onChange={e => setMet(e.target.value)} step=".1" />
			</label>
			<label htmlFor="">
				Description
				<textarea value={description} onChange={e => setDescription(e.target.value)} />
			</label>
			<label htmlFor="">
				Image
				<input type="text" placeholder="URL or FILE SELECT?" />
			</label>
			<button type="submit">Add Exericse</button>
		</form>
	)
}
