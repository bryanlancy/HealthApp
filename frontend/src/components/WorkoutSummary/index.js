import { useEffect, useState } from 'react'

export default function WorkoutSummary({ preset, days, title }) {
	const [_title, _setTitle] = useState("Today's stats")
	const [_days, _setDays] = useState(1)

	useEffect(() => {
		if (preset) {
			switch (preset) {
				case 'day':
					_setTitle("Today's stats")
					_setDays('1')
					break
				case 'week':
					_setTitle("This week's stats")
					_setDays('7')
					break
				case 'month':
					_setTitle("This month's stats")
					_setDays('30')
					break

				default:
					break
			}
		} else if (days && title) {
			_setTitle(title)
			_setDays(days)
		}
	}, [])

	return (
		<>
			<h3>WorkoutSummary</h3>
			<h3>{_title}</h3>
		</>
	)
}
