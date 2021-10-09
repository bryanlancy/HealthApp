import React, { useState } from 'react'
import { login } from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'

export default function Login({ userId, cancel }) {
    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.session.users)
    const [credential, setCredential] = useState(userId ? allUsers[userId].username : '')
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
    if (userId) {
        console.log(userId)
        usernameEmail = (<p>Welcome back, {credential}</p>)
    } else {
        usernameEmail = (
            <label>
                Username or Email
                <input type="text" value={credential} onChange={e => setCredential(e.target.value)
                } required />
            </label >)
    }



    return (
        < form form onSubmit={handleSubmit} className="login-form" >
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            {usernameEmail}
            <label>
                Password
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Log In</button>
            <button onClick={handleCancel}>Cancel</button>
        </form >
    )
}
