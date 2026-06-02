import React, { useState } from 'react'
import "../style/register.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const WaveformLogo = () => (
    <svg className="waveform-logo" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect className="bar bar-1" x="6" y="20" width="4" height="8" rx="2" fill="#1DB954" />
        <rect className="bar bar-2" x="14" y="12" width="4" height="24" rx="2" fill="#1DB954" />
        <rect className="bar bar-3" x="22" y="6" width="4" height="36" rx="2" fill="#1DB954" />
        <rect className="bar bar-4" x="30" y="16" width="4" height="16" rx="2" fill="#1DB954" />
        <rect className="bar bar-5" x="38" y="22" width="4" height="4" rx="2" fill="#1DB954" />
    </svg>
)

const UserIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
)

const EmailIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
)

const LockIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
)

const Register = () => {
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()

    async function handleSubmit(e) {
        e.preventDefault()
        await handleRegister({ username, password, email })
        navigate('/')
    }

    return (
        <main className="register-page">
            {/* Ambient Glow Elements */}
            <div className="ambient-bg">
                <div className="glow-blob glow-green"></div>
                <div className="glow-blob glow-violet"></div>
                <div className="music-note note-1">🎵</div>
                <div className="music-note note-2">🎶</div>
                <div className="music-note note-3">♩</div>
                <div className="music-note note-4">♫</div>
                <div className="music-note note-5">♬</div>
                <div className="music-note note-6">🎵</div>
            </div>

            <div className="form-container">
                <div className="header">
                    <div className="logo-container">
                        <WaveformLogo />
                        <div className="logo-text">Moodify</div>
                    </div>
                    <h1 className="title">Join Moodify</h1>
                    <p className="subtitle">Create an account to start detecting expressions</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Name" 
                        placeholder="Enter your name" 
                        icon={<UserIcon />}
                    />
                    <FormGroup
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email" 
                        placeholder="Enter your email" 
                        type="email"
                        icon={<EmailIcon />}
                    />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password" 
                        placeholder="Enter your password" 
                        type="password"
                        icon={<LockIcon />}
                    />
                    <button className='button' type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="footer-text">
                    Already have an account? <Link to="/login" className="auth-link">Login here</Link>
                </p>
            </div>
        </main>
    )
}

export default Register


