import React, { useState, useEffect } from 'react'
import { getUsers } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

import UserTile from '../UserTile.js'
import { LoginForm } from '../forms'
import SiteInfo from '../SiteInfo'

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
			<SiteInfo />
			{!userSelected &&
				<section className="existing-users">
					{allUsers &&
						Object.keys(allUsers).map(id => (
							< UserTile key={`user-${id}`}
								user={allUsers[id]}
								button={{ text: 'Log In ➔', handler: () => { setUserSelected(id) } }}
							/>
						))
					}
					<UserTile user={{ username: 'New User', avatar: '../user-light.png' }} button={{ text: 'Sign Up ➔', handler: () => { history.push('/signup') } }} />
				</section>}
			{userSelected !== 0 && <LoginForm userId={userSelected} cancel={() => { setUserSelected(0) }} />}
		</div>
	)
}

export default LoginFormPage
