import react from 'react';
import nft from '../images/nft.jpeg'
import flow_icon from '../images/flow-icon.png';
import './NFTCard.css'
function NFTcard() {
    return(
        <div class=" border-2 border-solid border-white border-2 w-[300px] h-[450px] bg-[#333333] mx-auto mt-5 rounded-xl hover:scale-110 transform transition duration-500">
            <img src={nft} class="w-[270px] h-[200px] mx-auto mt-[20px] ml-[15px] rounded-xl"/>
        <div>
            <p class="text-white font-bold ml-5 text-[20px] pt-[20px]">Alien #69696</p>
            <p class="text-gray-400 ml-5">dekho abhi kuch likhne ke liye nahi hai isliye yeh sab likh raha huu</p>
        </div>

        <div class="flex">
            <img src={flow_icon} class="w-[30px] h-[30px] ml-5 mt-5"/>
            <p class="font-bold text-gray mt-[23px] ml-[10px]"> 69.69 FLOW</p>
        </div>
        
        <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-poppins font-bold rounded-lg text-sm px-5 py-2.5 text-center mt-3 ml-[170px] ji">BUY NFT</button>

        </div>

    )
}

export default NFTcard