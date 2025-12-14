import React from 'react';
import '../../App.css'
import { VscArrowSmallRight } from "react-icons/vsc";
import Game from '../../assets/images/andrey.jpg'
import StartQuiz from '../../assets/images/PastelQuiz.jpg'
import Template from '../../assets/images/PastelTemp.jpg'


export default function Hero() {
    return (
        <>
      <main className="max-w-8xl mx-auto px-6 md:px-12 font-[charis] mt-25 text-sm bg-pink-50 py-20">
        
        <section className='flex align-stretch gap-2'>
          <div className='flex-50 text-base min-h-100'>
       <h2 className="text-5xl font-bold">QuizMe!</h2>
       <br/>
       <p>Create, play and share fun learning quizzes right from your browser.</p>
       <br/>
      <p>Bring interaction to your lessons, presentations or group activities with QuizMe! Create engaging quizzes, polls, puzzles and challenges that get everyone involved.
        <br/>
        Anytime, on any device.</p>
<br/>
<p>No downloads needed, everything works instantly on the web</p>
<br/>
<p>Build custom quizzes in minutes</p> 
<br/>

<p>Host live sessions and watch players compete in real time</p>
<br/>
<p>Use polls, puzzles and multi-choice challenges to spark engagement</p>
<br/>
<p>Share your QuizMe! games with anyone using a simple link</p>

<br/>

<p>Unlock advanced features to host larger groups, add more question styles and access deeper insights.</p>
</div>

<div className='flex-50 min-h-100'>
  <img src={Game} alt="Game image" />
</div>
</section>
<div className='flex justify-between items-center mt-20 p-10 text-xl'>
  <div className='flex items-center 
  bg-white
   rounded-xl 
   p-6 
   justify-between
    h-40 gap-10 
  shadow-xl hover:shadow-2xl
  pr-10
  '>
    <img src={StartQuiz} alt='' className='items-left rounded-full h-30 w-30'/>
  <p className='text-center items-right text-xl font-bold'>Start a Quiz</p>
  </div>
<div className='flex items-center bg-white rounded-xl p-6 justify-between h-40 gap-8 shadow-xl hover:shadow-2xl'>
  <img src={Template} alt='' className='rounded-full object-fill h-30 w-30' />
<p className='text-xl font-bold'> Explore Templates</p>
</div>
</div>
      </main>
        </>
    )
}
