import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ResponsiveContainer, AreaChart, YAxis, XAxis, CartesianGrid, Tooltip, Area } from 'recharts'

export default function WorkoutChart({ preset, days, title }) {
	const [_days, _setDays] = useState(days || 1)
	const [_title, _setTitle] = useState(title ? title : days ? `Last ${days} days` : "Today's stats")

	const { date: sortedList } = useSelector(state => state.workouts.sortedWorkouts)
	const { workouts } = useSelector(state => state.workouts)
	const [chartData, setChartData] = useState([])

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
		}
	}, [preset, days, title])

	useEffect(() => {
		function formatDate(date) { }

		if (sortedList) {
			setChartData(
				sortedList.reverse().map((id, i) => {
					const { date, calories, reps } = workouts[id]
					console.log(id, date)
					return {
						calories: calories.toFixed(2),
						date: formatDate(date),
						reps,
					}
				})
			)
		}
	}, [sortedList, workouts])

	return (
		<div className="workout-summary">
			<h3>{_title}</h3>
			<div className="workout-summary__dates"></div>
			<ResponsiveContainer width="100%" height={250}>
				<AreaChart data={chartData}>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="date" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area type="monotone" dataKey="calories" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
					<Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}
