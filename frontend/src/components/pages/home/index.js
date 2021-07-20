import TestWorkouts from '../../TestWorkouts'
import WorkoutSummary from '../../WorkoutSummary'
export default function HomePage() {
	return (
		<div className="page">
			<h1>Home</h1>
			<WorkoutSummary preset="day" />
			<WorkoutSummary preset="week" />
			<WorkoutSummary preset="month" />
			<WorkoutSummary days={14} title="Last 14 days" />
			<TestWorkouts />
		</div>
	)
}
