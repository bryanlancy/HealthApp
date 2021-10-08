import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import * as sessionActions from './store/session'
import { populateExercise } from './store/exercise'
import { populateWorkouts } from './store/workouts'

import Navigation from './components/Navigation'
import { Login, Signup, NewExercise, NewWorkout } from './components/forms'
import { HomePage, ExerciseDetailPage } from './components/pages'
import ProtectedRoute from './components/ProtectedRoute'

import ScssExample from './components/ScssExample'


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
				dispatch(populateWorkouts())
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
						<HomePage />
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
					<Route path="/scss-example">
						<ScssExample />
					</Route>
				</Switch>
			)}
		</>
	)
}

export default App
