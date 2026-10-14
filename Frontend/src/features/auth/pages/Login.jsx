import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

    if (loading) {
        return (
            <main className="auth-main">
                <div className="glass-card">
                    <h1>Loading...</h1>
                </div>
            </main>
        )
    }

    return (
        <main className="auth-main">
            <div className="glass-card">
                <div className="card-header">
                    <h1>Welcome Back</h1>
                    <p>Enter your credentials to access your interview plans.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-form">
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            id="email"
                            name='email'
                            placeholder='Enter email address'
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name='password'
                                placeholder='Enter password'
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>
                    <button className='button primary-button glass-button' type="submit">
                        Login
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Login