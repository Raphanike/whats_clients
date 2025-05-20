import LoginForm from '../components/LoginForm'

export default function Login({ onLogin }) {
    return (
        <div className='login'>
        <h1><img src="./img/whats.png" alt="" /></h1>
        <LoginForm onLogin={onLogin} />
        </div>
    )
}
