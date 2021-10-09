import React, { useState, useEffect } from 'react'
import { getUsers } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import UserTile from '../UserTile.js'
import { LoginForm } from '../forms'

function LoginFormPage() {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user)
	const allUsers = useSelector(state => state.session.users)
	const [userSelected, setUserSelected] = useState(false)


	useEffect(() => {
		dispatch(getUsers())
	}, [])

	if (sessionUser) return <Redirect to="/" />

	return (
		<>
			{allUsers && !userSelected &&
				allUsers.map(user => < UserTile key={`user-${user.id}`} user={user} />)
			}

			{userSelected && <LoginForm />}
		</>
	)
}

export default LoginFormPage
