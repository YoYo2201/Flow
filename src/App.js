import logo from './logo.svg';
import './App.css';
import "./flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

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
      <div>
        {user.loggedIn
          ? <AuthedState />
          : <UnauthenticatedState />
        }
      </div>
      
      {/* <div>hello</div> */}

      <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
  <div className="max-w-5xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <span className="text-2xl text-gray-900 font-semibold">Logo</span>
      <div className="flex space-x-4 text-gray-900">
        <a href="#">Dashboard</a>
        <a href="#">About</a>
        <a href="#">Projects</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </div>
</nav>

    </div>
  );
}

export default App;
