import { useSelector } from 'react-redux'
import TestWorkouts from '../../TestWorkouts'
import WorkoutChart from '../../WorkoutChart'

import WorkoutGroupCreator from '../../WorkoutGroupCreator'


export default function HomePage() {


	const { default: sorted } = useSelector(state => state.workouts.sortedWorkouts)


	return (
		<div className="page">
			<h1>Home</h1>
			<WorkoutChart preset="day" />
			{sorted && <WorkoutGroupCreator allWorkouts={sorted} />}
			<WorkoutChart preset="week" />
			<WorkoutChart preset="month" />
			<WorkoutChart days={14} />
			<TestWorkouts />
		</div>
	)
}
