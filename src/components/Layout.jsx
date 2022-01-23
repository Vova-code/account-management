import React from 'react'
import PropTypes from 'prop-types'

import Link from 'next/link'

import { IoHome } from 'react-icons/io5'

const Layout = ({ children }) => {
  return (
    <div className="h-full">
      <div className="navbar bg-white w-full flex justify-between items-center h-12 shadow-md fixed top-0 px-4">
        <Link href="/">
          <IoHome className="w-10 h-10 text-emerald-500 rounded-full hover:bg-emerald-900 transition-colors delay-80 p-2 cursor-pointer" />
        </Link>
        <Link href="/add-entry">
          <button className="text-white font-semibold text-sm bg-emerald-500 hover:bg-emerald-900 py-1.5 px-4 rounded-lg transition-colors delay-80">
            Ajouter une entrée
          </button>
        </Link>
      </div>
      {children}
      <footer className="bg-white w-full flex justify-center items-center shadow-md fixed bottom-0 h-12 shadow-upper">
        <a
          href="https://github.com/Vova-code"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold"
        >
          © Vova-code
        </a>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.object,
}

export default Layout
