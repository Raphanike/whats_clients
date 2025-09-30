import { useState } from 'react'
import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {
  const [user, setUser] = useState(null)


  return (
    <div>
      {user ? <Chat user={user} /> : <Login onLogin={setUser} />}
    </div>
  )
}

export default App
