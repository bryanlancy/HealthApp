import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function ExerciseDetailPage() {
	const { exercises } = useSelector(state => state.exercise)
	const { id } = useParams()

	const exercise = useMemo(() => {
		if (exercises) {
			const { label, description, met, image, quantity } = exercises[id]
			console.log(exercises[id])
			return (
				<>
					<p>{label}</p>
					<p>{description}</p>
					<p>{met}</p>
					<p>{image}</p>
					<p>{quantity}</p>
				</>
			)
		}
	}, [exercises, id])

	return (
		<>
			<h1>Exercise Detail Page</h1>
			{exercise}
		</>
	)
}
