import React, { useState, useEffect } from 'react'
import { getUsers } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

import UserTile from '../UserTile.js'
import { LoginForm } from '../forms'

function LoginFormPage() {
	const history = useHistory()
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user)
	const allUsers = useSelector(state => state.session.users)
	const [userSelected, setUserSelected] = useState(0)

	useEffect(() => {
		dispatch(getUsers())
	}, [])

	if (sessionUser) return <Redirect to="/" />

	return (
		<div className="page">
			{!userSelected &&
				<section className="existing-users">
					{allUsers &&
						Object.keys(allUsers).map(id => (
							< UserTile key={`user-${id}`}
								user={allUsers[id]}
								button={{ text: 'Log In', handler: () => { setUserSelected(id) } }}
							/>
						))
					}
					<UserTile user={{ username: 'New User', avatar: '../plus.png' }} button={{ text: '➔', handler: () => { history.push('/signup') } }} />
				</section>}
			{userSelected !== 0 && <LoginForm userId={userSelected} cancel={() => { setUserSelected(0) }} />}
		</div>
	)
}

export default LoginFormPage
