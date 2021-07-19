//! SPLIT INTO STEPS TO SIMPLIFY FORM
//! ADD VALIDATION TO UI

import { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newExercise } from '../../../store/exercise'

export default function NewExercise() {
	const dispatch = useDispatch()
	const { categories, exercises } = useSelector(state => state.exercise)

	const [newCategory, setNewCategory] = useState('')
	const [quantity, setQuantity] = useState('reps')
	const [category, setCategory] = useState('new')
	const [met, setMet] = useState(0)
	const [duration, setDuration] = useState(0)
	const [label, setLabel] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')

	function resetForm() {
		setCategory('')
		setNewCategory('')
		setQuantity('time')
		setMet(0)
		setDuration(0)
		setLabel('')
		setDescription('')
		setImage('')
	}

	async function handleSubmit(e) {
		e.preventDefault()
		const exercise = {
			label,
			description,
			quantity,
			met,
			duration,
			image,
		}
		const response = await dispatch(newExercise(category !== 'new' ? category : newCategory, exercise))
		if (response.ok) {
			resetForm()
			setCategory(response.category.id)
		}
	}

	function updateQuantity(e) {
		setQuantity(e.target.value)
		if (e.target.value !== 'reps') {
			setDuration(0)
		}
	}

	const categoryOptions = useMemo(() => {
		if (categories) {
			setCategory(Object.keys(categories)[0])
		}
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

	return (
		<form onSubmit={handleSubmit} className="new-exercise-form">
			<h2>Add New Exercise</h2>
			<label htmlFor="">
				Category
				<select value={category} name="" id="" onChange={e => setCategory(e.target.value)}>
					{categoryOptions}
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
				<input type="text" value={label} onChange={e => setLabel(e.target.value)} placeholder="Name of exercise" required />
			</label>
			<label htmlFor="">
				MET
				<input type="number" value={met} onChange={e => setMet(e.target.value)} />
			</label>
			<label htmlFor="">
				Quantity
				<select value={quantity} name="" id="" onChange={updateQuantity}>
					<option value="time">Time</option>
					<option value="reps">Reps</option>
				</select>
			</label>
			{quantity === 'reps' && (
				<label htmlFor="">
					Duration (seconds)
					<input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Time per repitition" />
				</label>
			)}
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
