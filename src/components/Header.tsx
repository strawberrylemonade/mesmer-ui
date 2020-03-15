import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import mesmerLogoLong from '../assets/mesmer-long.png';
import mesmerLogoSmall from '../assets/mesmer-small.png';

import auth from '../helpers/auth';

enum DropDownState {
  Closed,
  Open
}

const Header: React.FC = () => {

  const [dropDownState, setDropDownState] = useState<DropDownState>(DropDownState.Closed);
  
  const user = auth.getAccount()

  return <nav className="bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex">
          <Link to='/' className="flex-shrink-0 flex items-center">
            <img className="block lg:hidden h-8 w-auto" src={mesmerLogoSmall} alt="" />
            <img className="hidden lg:block h-8 w-auto" src={mesmerLogoLong} alt="" />
          </Link>
          <div className="hidden sm:-my-px sm:ml-6 sm:flex">
            <Link to="/projects" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out">
              Projects
            </Link>
            <Link to="/tests" className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
              Tests
            </Link>
            <Link to="/" className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
              Debug
            </Link>
            <a href="https://www.notion.so/Help-Center-cc37013b9e9f40aca897bd70cf44ad7a" target="_blank" className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
              Docs
            </a>
          </div>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100 transition duration-150 ease-in-out">
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="ml-3 relative">
            <div>
              <button onClick={() => { setDropDownState(dropDownState === DropDownState.Open ? DropDownState.Closed : DropDownState.Open) }} className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
              <div className="h-10 w-10 rounded-full bg-indigo-300 flex items-center justify-center">
                <h3 className="text-lg font-bold text-indigo-600">
                  { user.name.slice(0, 1) }
                </h3>
              </div>
              </button>
            </div>
            <div className={`z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ${dropDownState === DropDownState.Closed ? 'hidden' : ''}`}>
              <div className="py-1 rounded-md bg-white shadow-xs">
                <div onClick={() => { auth.logout() }} className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer">Sign out</div>
              </div>
            </div>
          </div>
        </div>
        <div className="-mr-2 flex items-center sm:hidden">
          <button onClick={() => { setDropDownState(dropDownState === DropDownState.Open ? DropDownState.Closed : DropDownState.Open) }} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              <path className="hidden" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div className={`${dropDownState === DropDownState.Closed ? 'hidden' : ''} sm:hidden`}>
      <div className="pt-2 pb-3">
        <Link to="/projects" className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out">Projects</Link>
        <Link to="/tests" className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Tests</Link>
        <Link to="/" className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Debug</Link>
        <a href="https://www.notion.so/Help-Center-cc37013b9e9f40aca897bd70cf44ad7a" className="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Docs</a>
      </div>
      <div className="pt-4 pb-3 border-t border-gray-200">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-indigo-300 flex items-center justify-center">
              <h3 className="text-lg font-bold text-indigo-600">
                { user.name.slice(0, 1) }
              </h3>
            </div>
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-6 text-gray-800">{ user.name }</div>
            <div className="text-sm font-medium leading-5 text-gray-500">{ user.userName }</div>
          </div>
        </div>
        <div className="mt-3">
          <div onClick={() => { auth.logout() }} className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer">Sign out</div>
        </div>
      </div>
    </div>
  </nav>
}

export default Header;