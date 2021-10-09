import React, { useState } from 'react'
import { login } from '../../store/session'
import { useDispatch } from 'react-redux'

export default function Login() {
    const dispatch = useDispatch()
    const [credential, setCredential] = useState('')
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

    return (
        < form form onSubmit={handleSubmit} className="login-form" >
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Username or Email
                <input type="text" value={credential} onChange={e => setCredential(e.target.value)} required />
            </label>
            <label>
                Password
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Log In</button>
        </form >
    )
}
