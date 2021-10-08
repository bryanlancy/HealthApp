import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import WorkoutGroup from "./WorkoutGroup";


// [4,7,6,5,3,1,2,8,9] //? Sorted (date) Workout Ids
// [1,1,1,2,2,3,4,4,4] //? Workout Date




export default function WorkoutGroupCreator({ allWorkouts }) {


    const { workouts } = useSelector(state => state.workouts)

    //do some fancy grouping
    const workoutGroups = useMemo(() => {


        return [{ workoutIds: [1, 2, 3] }, { workoutIds: [2, 4, 6] }]
    }, [workouts, allWorkouts])


    return (workoutGroups.map((group, i) => {
        const { workoutIds } = group
        return <WorkoutGroup key={`workout-group-${i}`} workouts={workoutIds} />
    })
    )
}


