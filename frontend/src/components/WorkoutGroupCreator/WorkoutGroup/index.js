import { useState } from "react"
import { useSelector } from "react-redux"

export default function WorkoutGroup({ workouts }) {


    const { workouts: workoutsStore } = useSelector(state => state.workouts)


    const [totalCal, setTotalCal] = useState(0)


    if (!workouts) return null
    return (
        <div>
            <h1>
                Workout Group
            </h1>
            <div>

            </div>
            {workouts.map(workout => {
                console.log(workout)

                return <div key={`workout-${workout}`}> {workout} </div>
            })}
        </div >
    )
}
