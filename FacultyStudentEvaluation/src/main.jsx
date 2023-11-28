import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AdminHeader from './components/admin/AdminHeader.jsx'
import Login from './components/Login.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import AddStudent from './components/admin/AddStudents.jsx'
import AddFaculty from './components/admin/AddFaculty.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminHeader />
  },
  {
    path: '/admin/add-student',
    element: <AddStudent />
  },
  {
    path: '/admin/add-faculty',
    element: <AddFaculty />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
