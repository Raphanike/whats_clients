import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
    }
  }, [])

  return <div>{user ? <Chat user={user} /> : <Login onLogin={setUser} />}</div>
}

export default App
