import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import WorkoutGroup from "./WorkoutGroup";

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


