import logo from './logo.svg';
import './App.css';
import "./flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import bg from './images/bg.png';
import hehe from './images/hehe.png'
import hehe2 from './images/hehe2.png'
import hehe3 from './images/hehe3.png'
import avatar from './images/avatar.png'
import badge from './images/badges.webp'

function App() {
  const [user, setUser] = useState({loggedIn: null})
  const [name, setName] = useState('') // NEW
  const [loginPage, setLoginPage] = useState(false);
  var username = '';
  useEffect(() => fcl.currentUser.subscribe(setUser), [])
  
  const sendQuery = async () => {
    const profile = await fcl.query({
      cadence: `
        import Profile from 0xProfile

        pub fun main(address: Address): Profile.ReadOnly? {
          return Profile.read(address)
        }
      `,
      args: (arg, t) => [arg(user.addr, t.Address)]
    })
    setName(profile?.name ?? 'No Profile')
  }

  const initAccount = async () => {

    const transactionId = await fcl.mutate({

      cadence: `

        import Profile from 0xProfile


        transaction {

          prepare(account: AuthAccount) {

            // Only initialize the account if it hasn't already been initialized

            if (!Profile.check(account.address)) {

              // This creates and stores the profile in the user's account

              account.save(<- Profile.new(), to: Profile.privatePath)


              // This creates the public capability that lets applications read the profile's info

              account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)

            }

          }

        }

      `,

      payer: fcl.authz,

      proposer: fcl.authz,
      
      authorizations: [fcl.authz],
      limit: 50,
      
    })
    
    console.log(fcl.authz)

    const transaction = await fcl.tx(transactionId).onceSealed()

    console.log(transaction)

  }

  const logOutEvent = () => {
    fcl.unauthenticate();
  }

  const signUpPage = () => {
    const bg = document.getElementsByClassName('blur-objects');
    for(var i=0;i<bg.length;i++)
      bg[i].style.filter = '';
    const userName = document.getElementById('username');
    setLoginPage(false);
    username = userName.value;
    setName(username);
    fcl.signUp();
  }

  const close = () => {
    const bg = document.getElementsByClassName('blur-objects');
    for(var i=0;i<bg.length;i++)
      bg[i].style.filter = '';
    setLoginPage(false);
  }

  const login_page = () => {
    setLoginPage(true);
  }
  const SignUp = () => {
    const bg = document.getElementsByClassName('blur-objects');
    for(var i=0;i<bg.length;i++)
      bg[i].style.filter = 'blur(2px)';
    return (
      <>
    <div class="w-full h-full max-w-md max-h-md absolute z-50 md:inset-0" id="authentication-modal">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" onClick={close} class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
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
                    <button type="button" onClick={signUpPage} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create account</button>
                </form>
            </div>
        </div>
    </div>
</>
    )
  }

  const AuthedState = () => {
    return (
      <div className='login_buttons'>
        <button id="badgeNameButton" class="flex items-center text-sm font-medium text-white-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
    <span class="sr-only">Open user menu</span>
    <img class="w-12 h-12 mr-2 rounded-full" src={badge} alt="baby with headphones"></img>
    <p style={{marginRight: '2em'}}>570 COINS</p>
    {/* <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg> */}
</button>
      <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" class="flex items-center text-sm font-medium text-white-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
    <span class="sr-only">Open user menu</span>
    <img class="w-12 h-12 mr-2 rounded-full" src={avatar} alt="baby with headphones"></img>
    {name}
    <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</button>
<div id="dropdownAvatarName" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div class="py-2">
      <button type='button' onClick={fcl.unauthenticate} id="signOutButton" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
    </div>
</div>
    </div>

      // {/* <div className='login_buttons'> */}
      //   {/* <p><button onClick={clickEvent}><img src="https://images.unsplash.com/photo-1624669240815-815a23372f37?" alt="baby with headphones" class="w-12 h-12 rounded-full object-cover"></img></button>Chhota Bachcha</p> */}
      //   {/* <div>Address: {user?.addr ?? "No Address"}</div> */}
      //   {/* <div>Profile Name: {name ?? "--"}</div> NEW */}
      //   {/* <button onClick={sendQuery}>Send Query</button> */}
      //   {/* <button onClick={initAccount}>Init Account</button> NEW */}
      //   {/* <button onClick={fcl.unauthenticate}>Log Out</button> */}
      // {/* </div> */}
    )
  }

  const UnauthenticatedState = () => {
    return (
      <div className='login_buttons'>
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={fcl.logIn}>LOGIN </button>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" onClick={login_page}>
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                CREATE YOUR ACCOUNT
            </span>
          </button>
      </div>
    )
  }

  return (
    <div>
      <img src={bg} alt="" class="absolute inset-0 w-full h-full object-cover blur-objects" loading="lazy" />
      {/* <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30"> */}
      <nav className="sticky top-0 z-10 blur-objects">
  <div className="max-w-5xl mx-auto px-4" style={{maxWidth: 'none'}}>
    <div className="flex items-center justify-between h-16">
      <span className="text-2xl text-white-900 font-semibold" id='spanNavbar'>Logo</span>
      <div className="flex space-x-4 text-white-900" id='navbar'>
        <div className='navPack'>
        <div className='nav_menu'><a href="#">HOME</a></div>
        <div className='nav_menu'><a href="#">ABOUT</a></div>
        <div className='nav_menu'><a href="#">ORGANISATIONS</a></div>
        </div>
        {/* <div className='nav_menu'><a href="#"></a></div> */}
        {user.loggedIn
? <AuthedState />
: <UnauthenticatedState />
}
      </div>
    </div>
  </div>
</nav>
{loginPage ? <SignUp/> : undefined}

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
  );
}

export default App;
