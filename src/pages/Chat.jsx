import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import api from '../api/api'

const socket = io('https://whats-back-end-7.onrender.com')

// URL de um som de notificação (pode trocar pelo seu arquivo local ou online)
const notificationSound = '/notification.mp3'

export default function Chat({ user }) {
    const [receiver, setReceiver] = useState('')
    const [content, setContent] = useState('')
    const [messages, setMessages] = useState([])

    // Solicita permissão para notificações quando o componente monta
    useEffect(() => {
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission()
        }
    }, [])

    // Escuta mensagens recebidas em tempo real
    useEffect(() => {
        socket.on('receive_message', (msg) => {
            setMessages(prev => [...prev, msg])

            // Notificação visual
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(`Nova mensagem de ${msg.sender}`, {
                    body: msg.content,
                    icon: '/icon.png' // opcional
                })
            }

            // Notificação sonora
            const audio = new Audio(notificationSound)
            audio.play().catch(err => console.log('Erro ao tocar som:', err))
        })

        return () => {
            socket.off('receive_message')
        }
    }, [])

    const sendMessage = () => {
        if (!receiver || !content) return
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
            <h2 className='boas'>Olá, {user.name}</h2>

            <input
                className='destinatario'
                value={receiver}
                onChange={e => setReceiver(e.target.value)}
                placeholder="ID do destinatário"
            />

            <button className='destinatario2' onClick={loadMessages}>Carregar mensagens</button>

            <div>
                {messages.map((msg, i) => (
                    <p
                        className={`mensagem ${msg.sender === user.id ? 'voce' : 'outro'}`}
                        key={i}
                    >
                        <b>{msg.sender === user.id ? 'Eu  ' : 'Mensageiro '}:</b> {msg.content}
                    </p>
                ))}
            </div>

            <input
                className='botao'
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Mensagem"
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    )
}
