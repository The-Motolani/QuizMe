import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth1'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoutes'
import { Toaster } from 'react-hot-toast'
import Profile from './pages/Profile'
import QuizCategories from '../src/components/layout/QuizCategories';
import QuizOptions from './pages/QuizOptions'
import NotFound from './pages/404'
import ResetPassword from './pages/ResetPassword'
// import { AuthProvider } from './utils/AuthContext'

function App() {

  return (
    <>
        <Toaster position="top-right" />
        <Routes>
          <Route path='/' element = {<LandingPage/>}/>
          <Route path = '/login' element = {<Auth/>}/>
          <Route path='/signup' element = {<SignUp />} />
          <Route
          path="/homepage"
          element={
          <ProtectedRoute>
         <HomePage />
          </ProtectedRoute>
          }
          />
          <Route path='/profile' element= {<Profile/>}/>
          <Route path='/forgotPassword' element = {<ForgotPassword/>}/>
          <Route path='/dashboard/*' element = {<Dashboard/>}/>
          <Route path="*" element={<NotFound />} />
           <Route path="/quiz" element={<QuizCategories />} />
        <Route path="/quiz/:category" element={<QuizOptions />} />
        <Route path="/quiz/:category/:subcategory" element={<QuizOptions />} />
        <Route path="/reset-password/" element={<ResetPassword />} />
        </Routes>
       
    </>
  )
}

export default App
