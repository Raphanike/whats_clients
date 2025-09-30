import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import api from '../api/api'

const socket = io('https://whats-back-end-7.onrender.com')

export default function Chat({ user }) {
    const [receiver, setReceiver] = useState('')
    const [content, setContent] = useState('')
    const [messages, setMessages] = useState([])

  useEffect(() => {
  socket.on('receive_message', (msg) => {
    setMessages(prev => [...prev, msg]);

    // dispara notificação se não for minha mensagem
    if (msg.sender !== user.id && Notification.permission === "granted") {
      new Notification("Nova mensagem!", {
        body: msg.content,
        icon: "/img/whats.png" // opcional
      });
    }
  });

  return () => {
    socket.off('receive_message');
  };
}, []); // <- esse fecha certinho, não precisa de vírgula extra

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
    <h2 className='boas'>Olá, {user.name}</h2>

    <input
        className='destinatario'
        value={receiver}
        onChange={e => setReceiver(e.target.value)}
        placeholder="ID do destinatário"
    />

    <button className='destinatario2' onClick={loadMessages}>
        
    </button>

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
