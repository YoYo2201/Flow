import React from 'react'
import bg from './images/bg.png';
import hehe from './images/hehe.png'
import hehe2 from './images/hehe2.png'
import hehe3 from './images/hehe3.png'
import NavBar from './NavBar';

export default function Home(props) {
    
    const SignUp = () => {
        const bg = document.getElementsByClassName('blur-objects');
        for(var i=0;i<bg.length;i++)
          bg[i].style.filter = 'blur(2px)';
        return (
          <>
        <div class="w-full h-full max-w-md max-h-md absolute z-50 md:inset-0" id="authentication-modal">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" onClick={props.close} class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign Up</h3>
                    <form class="space-y-6" action="#">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Username</label>
                            <input type="text" name="name" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John" required/>
                        </div>
                
                        <div class="flex justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
                                </div>
                                <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <button type="button" onClick={props.signUpPage} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create account</button>
                    </form>
                </div>
            </div>
        </div>
    </>
        )
      }

  return (
    <div>
      <img src={bg} alt="" class="absolute inset-0 w-full h-full object-cover blur-objects" loading="lazy" />
      {/* <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30"> */}
      <NavBar user={props.user} fcl={props.fcl} name={props.name} navigator={props.navigator} login_page={props.login_page} loginState={props.loginState}/>
{props.loginPage ? <SignUp/> : undefined}

<div className="main_heading blur-objects">
        <img
          src={hehe3}
          alt=""
          class="relative inset-0 w-half h-half"
          loading="lazy"
        />
      </div>
      <div className="main_heading2 blur-objects">
        <img
          src={hehe2}
          alt=""
          class="relative inset-0 w-half h-half"
          loading="lazy"
        />
      </div>
    </div>
  )
}
