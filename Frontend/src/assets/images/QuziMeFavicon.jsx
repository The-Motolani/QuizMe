import '../../App.css'
import { Link } from 'react-router-dom';

const QuizMeFavicon = () => {
  return (
    <>
    <Link to='/'>
    <svg
      width="240"
      height="70"
      viewBox="0 0 240 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft pastel fills */}
        <linearGradient id="pink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb6c8" />
          <stop offset="100%" stopColor="#ff8fa8" />
        </linearGradient>

        <linearGradient id="yellow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe8a3" />
          <stop offset="100%" stopColor="#ffd46b" />
        </linearGradient>

        <linearGradient id="mint" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8ffe3" />
          <stop offset="100%" stopColor="#9ef7cf" />
        </linearGradient>

        <linearGradient id="cream" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="100%" stopColor="#ffeebb" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <text
        x="10"
        y="57"
        fontFamily="'Baloo', sans-serif"
        fontSize="87"
        fill="rgba(0,0,0,0.25)"
        stroke="none"
        letterSpacing="5"
       
      >
        QM!
      </text>

      {/* Main Outline */}
      <text
        x="11"
        y="55"
        fontFamily="'Baloo', sans-serif"
        fontSize="80"
        stroke="#000"
        strokeWidth="4"
        fill="none"
        letterSpacing="5"
      >
        QM!
      </text>

      {/* Colored Text */}
      <text
        x="11"
        y="54"
        fontFamily="'Baloo', sans-serif"
        fontSize="82"
        letterSpacing="5"
        
      >
        <tspan fill="url(#pink)">Q</tspan>
        <tspan fill="url(#yellow)">M</tspan>
        <tspan fill="url(#mint)">!</tspan>
      </text>
    </svg>
    </Link>
    </>
  );
};

export default QuizMeFavicon;
