import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth1'
import SignUp from './pages/SignUp'
import HomePage from './pages/Homepage'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoutes'

function App() {

  return (
    <>
        <Routes>
          <Route path='/' element = {<LandingPage/>}/>
          <Route path = '/auth' element = {<Auth/>}/>
          <Route path='/signup' element = {<SignUp />} />
          <Route
          path="/homepage"
          element={
          <ProtectedRoute>
         <HomePage />
          </ProtectedRoute>
          }
          />

          <Route path='/forgotPassword' element = {<ForgotPassword/>}/>
          <Route path='/dashboard' element = {<Dashboard/>}/>
        </Routes>
       
    </>
  )
}

export default App
