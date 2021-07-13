import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function NewExercise() {
	const categories = useSelector(state => state.exercise)
	console.log(categories)

	const [category, setCategory] = useState('')
	const [variation, setVariation] = useState('')
	const [MET, setMET] = useState(0.0)
	const [label, setLabel] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')

	function handleSubmit(e) {
		e.preventDefault()
	}

	return (
		<form onSubmit={handleSubmit} className="new-exercise-form">
			<label htmlFor="">
				Category
				<select value={category} name="" id="" onChange={e => setCategory(e.target.value)}>
					{Object.keys(categories).map(cat => (
						<option value={cat}>{cat[0].toUpperCase() + cat.slice(1)}</option>
					))}
					<option value="new">New</option>
				</select>
			</label>
			{category === 'new' && (
				<label htmlFor="">
					New Category
					<input type="text" value={category} onChange={e => setCategory(e.target.value)} />
				</label>
			)}
			<label htmlFor="">
				Variation
				<input type="text" value={variation} onChange={e => setVariation(e.target.value)} />
			</label>
			<label htmlFor="">
				MET
				<input type="number" value={MET} onChange={e => setMET(e.target.value)} step=".1" />
			</label>
			<label htmlFor="">
				Label
				<input type="text" value={label} onChange={e => setLabel(e.target.value)} />
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
