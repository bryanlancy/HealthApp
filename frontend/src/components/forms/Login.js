import React, { useState } from 'react'
import { login } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'

export default function Login({ userId, cancel }) {

    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.session.users)
    const { [userId]: user } = allUsers
    const [credential, setCredential] = useState(user ? user.username : '')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = e => {
        e.preventDefault()
        setErrors([])
        return dispatch(login({ credential, password })).catch(async res => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })
    }
    const handleCancel = e => {
        setPassword('')
        setCredential('')
        setErrors([])
        cancel()
    }

    let usernameEmail
    if (user) {
        usernameEmail = (
            <h2>Welcome back, {credential}</h2>
        )
    } else {
        usernameEmail = (
            <div>
                <label>
                    Username or Email
                </label >
                <input type="text" value={credential} onChange={e => setCredential(e.target.value)
                } required />
            </div>
        )
    }

    return (
        < form form onSubmit={handleSubmit} className="login-form" >
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>

            {user && <div className="login-form__avatar"><img src={`images/avatars/${user.avatar}`} alt="avatar" /></div>}

            <div className="login-form__controls">

                <button onClick={handleCancel} className="login-form__button login-form__button--cancel"><i className="fal fa-long-arrow-left"></i></button>
                <div className="login-form__fields">
                    {usernameEmail}
                    <div>
                        <label>
                            Password
                        </label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                </div>
                <button type="submit" className="login-form__button login-form__button--confirm"><i className="fal fa-check"></i></button>
            </div>
        </form >
    )
}
