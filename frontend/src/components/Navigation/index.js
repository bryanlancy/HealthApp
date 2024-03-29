import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user)

	let sessionLinks
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />
	} else {
		sessionLinks = (
			<>
				<NavLink to="/login">Log In</NavLink>
				<NavLink to="/signup">Sign Up</NavLink>
			</>
		)
	}

	return (
		<nav className="navigation">
			<NavLink exact to="/">
				Home
			</NavLink>
			<NavLink exact to="/new-exercise">
				New Exercise
			</NavLink>
			<NavLink exact to="/new-workout">
				New Workout
			</NavLink>

			<div>{isLoaded && sessionLinks}</div>
		</nav>
	)
}

export default Navigation
