import LoginForm from '../components/LoginForm'

export default function Login({ onLogin }) {
    return (
        <div>
        <h1>Mini WhatsApp</h1>
        <LoginForm onLogin={onLogin} />
        </div>
    )
}
