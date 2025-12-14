import QuizMeLogo from '../assets/images/QuizMeLogo'
import QM from '../assets/images/QM!_favicon.png'
import QuizMeFavicon from '../assets/images/QuziMeFavicon'
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { MdLockOutline } from 'react-icons/md'
import SignUp from './SignUp'

export default function Auth() {
    return(
        <>
        <div className="flex flex-cols justify-center py-13 m-height-screen">
        <main className="flex flex-cols text-center justify-center items-center  w-full flex-1 px-20">
          <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
            <div className="lg:w-3/5 sm:w-full p-5 bg-blue-100">
            <QuizMeFavicon />
              <p className='text-3xl font-bold font-[Baloo] text-rose-300 mt-2'>Log In</p>
              <div className='border-2 w-10 rounded-3xl m-2 border-yellow-100 inline-block'></div>
              <div className='flex justify-center my-1 gap-10'>
              <a href='#' className='border mx-1 rounded-full border-gray-300 p-3 hover:shadow-2xl hover:cursor-pointer hover:border-gray-500'>
              <FaFacebookF className='text-sm'/> 
              </a>
              <a href='#' className='border mx-1 rounded-full border-gray-300 p-3 hover:shadow-2xl hover:cursor-pointer hover:border-gray-500'>
              <FaLinkedinIn className='text-sm'/> 
              </a>
              <a href='#' className='border mx-1 rounded-full border-gray-300 p-3 hover:shadow-2xl hover:cursor-pointer hover:border-gray-500'> 
              <FaGoogle className='text-sm'/>
              </a>
              </div>
              <p className='text-slate-400 my-3'>or log in using your Username or Email</p> 
              <form className='flex flex-col items-center gap-3'>
                <div className='bg-gray-100 w-64 p-2 flex items-center gap-2'>
                    <FaRegEnvelope className='text-gray-400 m-2'/>
                    <input type="text" name='identifier' id='identifier' placeholder='Email or Username' className='outline-none text-sm flex-1'/>
                </div>
                <div className='bg-gray-100 w-64 p-2 flex items-center gap-2'>
                    <MdLockOutline className='text-gray-400 m-2'/>
                    <input type="password" name='password' id='password' placeholder='Password' className='outline-none text-sm flex-1'/>
                </div>
                
              </form>
              <div className='flex w-64 items-center justify-end gap-10 mx-20 mb-3 mt-3 text-gray-500'>
                <label for='remember' className='flex text-sm items-center'>
                  <input type="checkbox" name='remember' className='hover:cursor-pointer mr-1 border-gray-300' />
                Remember me
                </label>
                <Link to="forgotPassword" className='text-xs hover:text-gray-700 hover:cursor-pointer'>
                Forgot Password?
                </Link>
              </div>
              <a href='homepage' className="border-3 border-teal-100 bg-slate-200 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white mt-5 hover:cursor-pointer hover:shadow-2xl text-gray-500 hover:text-gray-700 ">
              Sign In  
              </a>  
              </div>
            <div className=" lg:w-2/5 bg-teal-100 text-slate-500 rounded-tr-2xl rounded-br-2xl py-36 px-12 ">
             <QuizMeFavicon className="w-16 md:32 lg:48"/>
            
             <div className='border-5 w-10 rounded-2xl border-yellow-100 inline-block'></div>
             <h3 className="text-xl font-bold">don't have an account?</h3>
             <Link to="signup">
              <p className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white mt-6 hover:cursor-pointer hover:shadow-2xl transform-3d"> Sign Up </p>
             </Link>
              </div>
          </div>
        </main>
        </div>
        </>
    )
}