import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import api from '../api/api'

const socket = io('https://whats-back-end-5.onrender.com')

export default function Chat({ user }) {
    const [receiver, setReceiver] = useState('')
    const [content, setContent] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.on('receive_message', (msg) => {
        setMessages(prev => [...prev, msg])
        })

        return () => {
        socket.off('receive_message')
        }
    }, [])

    const sendMessage = () => {
        const msg = { sender: user.id, receiver, content }
        socket.emit('send_message', msg)
        setContent('')
    }

    const loadMessages = async () => {
        try {
        const res = await api.get(`/messages/${user.id}/${receiver}`)
        setMessages(res.data)
        } catch (err) {
        alert('Erro ao carregar mensagens: ' + (err.response?.data?.error || err.message))
        }
    }

    return (
        <div>
        <h2>Chat de {user.name}</h2>
        <input value={receiver} onChange={e => setReceiver(e.target.value)} placeholder="ID do destinatário" />
        <button onClick={loadMessages}>Carregar conversa</button>

        <div>
            {messages.map((msg, i) => (
            <p key={i}><b>{msg.sender === user.id ? 'Você' : 'Outro'}:</b> {msg.content}</p>
            ))}
        </div>

        <input value={content} onChange={e => setContent(e.target.value)} placeholder="Digite sua mensagem" />
        <button onClick={sendMessage}>Enviar</button>
        </div>
    )
}
