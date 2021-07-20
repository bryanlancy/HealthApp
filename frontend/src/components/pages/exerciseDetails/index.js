import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function ExerciseDetailPage() {
	const { exercises } = useSelector(state => state.exercise)
	const { id } = useParams()

	const exercise = useMemo(() => {
		if (exercises) {
			const { label, description, met, image, quantity } = exercises[id]
			return (
				<div className="exercise">
					<img src={image} alt={label} />

					<div className="exercise__text">
						<h2>{label}</h2>
						<div className="exercise__details">
							<label>
								MET
								<input value={met} />
							</label>
							<label>
								Counting Unit
								<input value={quantity} />
							</label>
							<label>
								Description
								<textarea value={description}></textarea>
							</label>
						</div>
					</div>
				</div>
			)
		}
	}, [exercises, id])

	return (
		<div className="page">
			<h1>Exercise Details</h1>
			{exercise}
		</div>
	)
}
