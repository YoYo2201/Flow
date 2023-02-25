// import logo from "./logo.svg";
// import "./App.css";
// import "./flow/config";
// import { useState, useEffect } from "react";
// import * as fcl from "@onflow/fcl";
// import bg from "./images/bg.png";
// import hehe from "./images/hehe.png";
// import hehe2 from "./images/hehe2.png";
// import hehe3 from "./images/hehe3.png";
// import { useNavigate } from "react-router-dom";

// function App() {
//   const [user, setUser] = useState({ loggedIn: null });
//   const [name, setName] = useState(""); // NEW
//   useEffect(() => fcl.currentUser.subscribe(setUser), []);
//   const navigate = useNavigate();

//   const sendQuery = async () => {
//     const profile = await fcl.query({
//       cadence: `
//         import Profile from 0xProfile

//         pub fun main(address: Address): Profile.ReadOnly? {
//           return Profile.read(address)
//         }
//       `,
//       args: (arg, t) => [arg(user.addr, t.Address)],
//     });
//     setName(profile?.name ?? "No Profile");
//   };

//   const initAccount = async () => {
//     const transactionId = await fcl.mutate({
//       cadence: `

//         import Profile from 0xProfile


//         transaction {

//           prepare(account: AuthAccount) {

//             // Only initialize the account if it hasn't already been initialized

//             if (!Profile.check(account.address)) {

//               // This creates and stores the profile in the user's account

//               account.save(<- Profile.new(), to: Profile.privatePath)


//               // This creates the public capability that lets applications read the profile's info

//               account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)

//             }

//           }

//         }

//       `,

//       payer: fcl.authz,

//       proposer: fcl.authz,

//       authorizations: [fcl.authz],
//       limit: 50,
//     });

//     console.log(fcl.authz);

//     const transaction = await fcl.tx(transactionId).onceSealed();

//     console.log(transaction);
//   };

//   const AuthedState = () => {
//     return (
//       <div>
//         <div>Address: {user?.addr ?? "No Address"}</div>
//         <div>Profile Name: {name ?? "--"}</div> {/* NEW */}
//         <button onClick={sendQuery}>Send Query</button>
//         <button onClick={initAccount}>Init Account</button> {/* NEW */}
//         <button onClick={fcl.unauthenticate}>Log Out</button>
//       </div>
//     );
//   };

//   const Login = () => {
//     fcl.logIn();
//     window.alert("Yay your are logged in!");
//   };

//   const UnauthenticatedState = () => {
//     return (
//       <div>
//         <button onClick={Login}>Log In</button>
//         <button onClick={fcl.signUp}>Sign Up</button>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {/* <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30"> */}
//       <nav className="sticky top-0 z-10">
//         <div className="max-w-5xl mx-auto px-4" style={{ maxWidth: "none" }}>
//           <div className="flex items-center justify-between h-16">
//             <span
//               className="text-2xl text-white-900 font-semibold"
//               id="spanNavbar"
//             >
//               Logo
//             </span>
//             <div className="flex space-x-4 text-white-900" id="navbar">
//               <div className="navPack">
//                 <div className="nav_menu">
//                   <a href="#">HOME</a>
//                 </div>
//                 <div className="nav_menu">
//                   <a href="#">ABOUT</a>
//                 </div>
//                 <div className="nav_menu">
//                   <a href="#">ORGANISATIONS</a>
//                 </div>
//               </div>
//               {/* <div className='nav_menu'><a href="#"></a></div> */}

//               <div className="login_buttons">
//                 <button
//                   type="button"
//                   class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
//                   onClick={fcl.logIn}
//                 >
//                   LOGIN{" "}
//                 </button>
//                 <button
//                   class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
//                   onClick={fcl.signUp}
//                 >
//                   <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
//                     CREATE YOUR ACCOUNT
//                   </span>
//                 </button>
//                 <button
//         type="button"
//         class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
//         onClick={()=>navigate("/main")}
//       >
//         GO TO MARKETPLACE{" "}
//       </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <img
//         src={bg}
//         alt=""
//         class="absolute inset-0 w-full h-full object-cover"
//         loading="lazy"
//       />
//       <div className="main_heading">
//         <img
//           src={hehe3}
//           alt=""
//           class="relative inset-0 w-half h-half"
//           loading="lazy"
//         />
//       </div>
//       <div className="main_heading2">
//         <img
//           src={hehe2}
//           alt=""
//           class="relative inset-0 w-half h-half"
//           loading="lazy"
//         />
//       </div>

      
//     </div>
//   );
// }

// export default App;
import logo from './logo.svg';
import './App.css';
import "./flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import AuthedState from './AuthedState';
import { Routes, Route } from "react-router-dom";
import Marketplace from "./pages/Marketplace.js";
import Collection from "./pages/Collections.js";
import { useNavigate, Link } from "react-router-dom";
import UnauthenticatedState from './UnauthenticatedState';
import Home from './Home';

function App(props) {
  const [user, setUser] = useState({loggedIn: null})
  const [name, setName] = useState('') // NEW
  const [loginPage, setLoginPage] = useState(false);
  const [loginState, setLoginState] = useState(false);
  var username = '';
  useEffect(() => fcl.currentUser.subscribe(setUser), [])
  useEffect(() => {}, [loginState])
  
  const navigator = (position, replace) => {
    props.navigate(position, {replace: replace});
  }

  const logOutEvent = async () => {
    if(user) {
    await fcl.unauthenticate();
    setLoginState(false);
    }
  }

  const signUpPage = async () => {
    const bg = document.getElementsByClassName('blur-objects');
    for(var i=0;i<bg.length;i++)
      bg[i].style.filter = '';
    const userName = document.getElementById('username');
    setLoginPage(false);
    username = userName.value;
    setName(username);
    await fcl.signUp();
    setLoginState(true);
    navigator('/main', true);
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

  // logOutEvent();

  return (
    <Routes>
      <Route path="/" element={<Home close={close} signUpPage={signUpPage} user={user} fcl={fcl} name={name} navigator={navigator} login_page={login_page} loginPage={loginPage} loginState={loginState} setLoginState={setLoginState} />} />
      <Route path="/main" element={<Marketplace user={user} fcl={fcl} name={name} navigator={navigator} login_page={login_page} loginPage={loginPage} loginState={loginState}/>} />
      <Route path="/collection" element={<Collection user={user} fcl={fcl} name={name} navigator={navigator} login_page={login_page} loginPage={loginPage} loginState={loginState}/>} />
    </Routes>
  );
}

function WithNavigate() {
  let navigate = useNavigate();
  return <App navigate={navigate} />
}

export default WithNavigate;

