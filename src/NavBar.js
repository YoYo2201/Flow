import React from 'react'
import AuthedState from './AuthedState';
import UnauthenticatedState from './UnauthenticatedState';
import {Link} from 'react-router-dom'

export default function NavBar(props) {
  return (
    <nav className="sticky top-0 z-10 blur-objects backdrop-blur-md">
  <div className="max-w-5xl mx-auto px-4" style={{maxWidth: 'none'}}>
    <div className="flex items-center justify-between h-16">
      <span className="text-2xl text-white-900 font-semibold" id='spanNavbar'>Logo</span>
      <div className="flex space-x-4 text-white-900" id='navbar'>
        <div className='navPack'>
        <div className='nav_menu'><Link to='/main'>HOME</Link></div>
        <div className='nav_menu'><a href="#">ABOUT</a></div>
        <div className='nav_menu'><a href="#">ORGANISATIONS</a></div>
        {props.loginState ? <div className='nav_menu'><Link to='/collection'>Your Collection</Link></div> : undefined}
        </div>
        {/* <div className='nav_menu'><a href="#"></a></div> */}
        {props.loginState
? <AuthedState fcl={props.fcl} name={props.name} navigator={props.navigator} address = {props.user.addr}/>
: <UnauthenticatedState login_page={props.login_page} fcl={props.fcl} setLoginState={props.setLoginState}/>
}
      </div>
    </div>
  </div>
</nav>
  )
}
