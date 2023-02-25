import {react} from 'react';
// import Navbar from './'
// import NFTcard from '../components/NFTCard.js';
// import NFTCard from "../components/NFTCard.js";
import NFTcardCollection from '../components/NFTCollectionCard';
import NavBar from '../NavBar';
function Collection(props){
    if(props.loginState === false) {
        props.navigator('/', true);
    }
    return(
        <div class="bg-gradient-to-r from-fuchsia-600 to-purple-600">
            {/* <Navbar /> */}
            <NavBar user={props.user} fcl={props.fcl} name={props.name} navigator={props.navigator} login_page={props.login_page} loginState={props.loginState}/>
            <div class="text-7xl mt-20 font-zeyada font-thin">Your Collection</div>

            <div class="grid grid-cols-5 gap-4 mt-10">
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
          <NFTcardCollection />
        </div>
        </div>
    )
}

export default Collection