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
import AddSubject from './components/admin/AddSubjects.jsx'
import FacultyHeader from './components/faculty/FacultyHeader.jsx'
import StudentHeader from './components/student/StudentHeader.jsx'
import DisplayStudents from './components/faculty/DisplayStudents.jsx'
import Grades from './components/student/Grades.jsx'
import GradingByFaculty from './components/faculty/GradingByFaculty.jsx'
import AddFeedback from './components/student/AddFeedback.jsx'
import FeedbackForm from './components/student/FeedbackForm.jsx'
import ViewFeedback from './components/faculty/ViewFeedback.jsx'

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
  },
  {
    path: '/admin/add-student/add-subject',
    element: <AddSubject />
  },
  {
    path: '/student',
    element: <StudentHeader />
  },
  {
    path: '/faculty',
    element: <FacultyHeader />
  },
  {
    path: '/faculty/students',
    element: <DisplayStudents />
  },
  {
    path: '/student/grades',
    element: <Grades /> 
  },
  {
    path: '/faculty/grades',
    element: <GradingByFaculty />
  },
  {
    path: '/student/feedback',
    element: <AddFeedback />
  },
  {
    path: '/student/:id',
    element: <FeedbackForm />
  },
  {
    path: '/faculty/view-feedback',
    element: <ViewFeedback />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
