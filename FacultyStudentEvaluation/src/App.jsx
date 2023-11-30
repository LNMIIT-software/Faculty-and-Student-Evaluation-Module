import Header from './components/admin/AdminHeader'
import { useSelector } from 'react-redux'

function App() {
  const userData = useSelector(state => state.auth.userData)
  const user = useSelector(state.auth.user)
  const authStatus = useSelector(state.auth.status)

  return (
    <div>
      console.log(userData, user, authStatus)
    </div>
  )
}

export default App
