import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import * as sessionActions from './store/session'
import { populateExercise } from './store/exercise'

import Navigation from './components/Navigation'
import { Login, Signup, NewExercise, NewWorkout } from './components/forms'
import { ExerciseDetailPage } from './components/pages'
import TestWorkout from './components/TestWorkouts'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
	const dispatch = useDispatch()
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		dispatch(sessionActions.restoreUser())
			.then(() => {
				//CHANGE TO RETURN PROMISE HERE
				dispatch(populateExercise())
			})
			.then(() => {
				setIsLoaded(true)
			})
	}, [dispatch])

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<ProtectedRoute exact path="/">
						<TestWorkout />
					</ProtectedRoute>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/signup">
						<Signup />
					</Route>
					<ProtectedRoute path="/exercise/:id">
						<ExerciseDetailPage />
					</ProtectedRoute>
					<ProtectedRoute path="/new-exercise">
						<NewExercise />
					</ProtectedRoute>
					<ProtectedRoute path="/new-workout">
						<NewWorkout />
					</ProtectedRoute>
				</Switch>
			)}
		</>
	)
}

export default App
