import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session'

function SignupFormPage() {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user)

	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState([])

	const history = useHistory()

	if (sessionUser) return <Redirect to="/" />

	const handleSubmit = e => {
		e.preventDefault()
		if (password === confirmPassword) {
			setErrors([])
			return dispatch(sessionActions.signup({ email, username, password })).catch(async res => {
				const data = await res.json()
				if (data && data.errors) setErrors(data.errors)
			})
		}
		return setErrors(['Confirm Password field must be the same as the Password field'])
	}
	const handleCancel = e => {
		history.push('/login')
	}

	return (
		<form onSubmit={handleSubmit} className="signup-form form">
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<div className="form__controls">
				<button onClick={handleCancel} className="form__button form__button--cancel"><i className="fal fa-long-arrow-left"></i></button>
				<div className="form__fields">
					<div>
						<label>
							<i className="fal fa-envelope"></i>
							<p>Email</p>
						</label>
						<input type="text" value={email} onChange={e => setEmail(e.target.value)} required />
					</div>
					<div>
						<label>
							<i class="fal fa-user-edit"></i>
							<p>Username</p>
						</label>
						<input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
					</div>
					<div>
						<label>
							<i className="fal fa-key"></i>
							<p>Password</p>
						</label>
						<input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
					</div>
					<div>
						<label>
							Confirm Password
						</label>
						<input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
					</div>
				</div>
				<button type="submit" className="form__button form__button--confirm"><i className="fal fa-check"></i></button>
			</div>
		</form>
	)
}

export default SignupFormPage
