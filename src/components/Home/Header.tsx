import React from 'react'
import logo from '../../assets/logo.png'
import '../../styles/Header.css'

const Header = () => {
  return (
        <div className='flex'>
            <img src={logo} alt="logo" className='roundImg'/>
            <div className='p-l-10 text-white'>VanJoe</div>
        </div>
  )
}

export default Header