import '../../App.css'
import { Link } from 'react-router-dom';

const QuizMeLogo = () => {
  return (
    <>
    <Link to='/'>
    <svg
      width="300"
      height="80"
      viewBox="0 0 200 70"
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
        y="50"
        fontFamily="'Baloo', sans-serif"
        fontSize="58"
        fill="rgba(0,0,0,0.25)"
        stroke="none"
      >
        QuizMe!
      </text>

      {/* Main Outline */}
      <text
        x="11"
        y="49"
        fontFamily="'Baloo', sans-serif"
        fontSize="5"
        stroke="#000"
        strokeWidth="4"
        fill="none"
      >
        QuizMe!
      </text>

      {/* Colored Text */}
      <text
        x="1"
        y="58"
        fontFamily="'Baloo', sans-serif"
        fontSize="60"
      >
        <tspan fill="url(#pink)">Q</tspan>
        <tspan fill="url(#yellow)">u</tspan>
        <tspan fill="url(#mint)">i</tspan>
        <tspan fill="url(#mint)">z</tspan>
        <tspan fill="url(#yellow)">M</tspan>
        <tspan fill="url(#cream)">e</tspan>
        <tspan fill="url(#mint)">!</tspan>
      </text>
    </svg>
    </Link>
    </>
  );
};

export default QuizMeLogo;
