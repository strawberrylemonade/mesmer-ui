import React from 'react';
import { Link } from 'react-router-dom';

enum ButtonColour {
  mesmer = 'mesmer-600',
  red = 'red-500',
  gray = 'gray-600',
  white = 'white',
  indigo = 'indigo-600'
}

type ButtonProps = {
  colour?: 'mesmer' | 'gray' | 'red' | 'white' | 'indigo'
  to?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ colour = 'gray', onClick, to, children }) => {

  return <span className="ml-3 shadow-sm rounded-md">
    { to ? <Link type="button" to={to} className={`inline-flex items-center px-4 py-2 border border-${colour === 'white' ? 'gray-300' : 'transparent'} text-sm leading-5 font-medium rounded-md text-${colour === 'white' ? 'gray-700' : 'white'} bg-${ButtonColour[colour]} hover:bg-${colour}-400 focus:outline-none focus:shadow-outline-${colour} focus:border-${colour}-700 active:bg-${colour}-700 transition duration-150 ease-in-out`}>
      {children}
      </Link> :
      <button type="button" onClick={() => { if (onClick) { onClick() } }} className={`inline-flex items-center px-4 py-2 border border-${colour === 'white' ? 'gray-300' : 'transparent'} text-sm leading-5 font-medium rounded-md text-${colour === 'white' ? 'gray-700' : 'white'} bg-${ButtonColour[colour]} hover:bg-${colour}-400 focus:outline-none focus:shadow-outline-${colour} focus:border-${colour}-700 active:bg-${colour}-700 transition duration-150 ease-in-out`}>
      {children}
      </button> }
  </span>
}

export default Button;