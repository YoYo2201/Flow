import logo from './logo.svg';
import './App.css';
import "./flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import bg from './images/bg.png';

function App() {
  const [user, setUser] = useState({loggedIn: null})
  const [name, setName] = useState('') // NEW
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

  const AuthedState = () => {
    return (
      <div>
        <div>Address: {user?.addr ?? "No Address"}</div>
        <div>Profile Name: {name ?? "--"}</div> {/* NEW */}
        <button onClick={sendQuery}>Send Query</button>
        <button onClick={initAccount}>Init Account</button> {/* NEW */}
        <button onClick={fcl.unauthenticate}>Log Out</button>
      </div>
    )
  }

  const UnauthenticatedState = () => {
    return (
      <div>
        <button onClick={fcl.logIn}>Log In</button>
        <button onClick={fcl.signUp}>Sign Up</button>
      </div>
    )
  }

  return (
    <div>
      <img src={bg} alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      {/* <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30"> */}
      <nav className="sticky top-0 z-10">
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
        
        <div className='login_buttons'>
          <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">LOGIN </button>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                CREATE YOUR ACCOUNT
            </span>
          </button>
        </div>


      </div>
    </div>
  </div>
</nav>

    </div>
  );
}

export default App;
