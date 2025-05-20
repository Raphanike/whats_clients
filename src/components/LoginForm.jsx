import { useState } from 'react'
import api from '../api/api'

export default function LoginForm({ onLogin }) {
    const [isRegistering, setIsRegistering] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        if (isRegistering) {
            await api.post('/auth/register', { name, email, password })
            alert('Cadastro realizado, agora faça login')
            setIsRegistering(false)
        } else {
            const res = await api.post('/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            onLogin(res.data.user)
        }
        } catch (err) {
        alert('Erro: ' + err.response.data.error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
        {isRegistering && (
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" />
        )}
        <input className='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className='senha' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
        <button type="submit">{isRegistering ? 'Cadastrar' : 'Entrar'}</button>
        <p onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Já tem conta? Faça login' : ''}
        </p>
        </form>
    )
    }
