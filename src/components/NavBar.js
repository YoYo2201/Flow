import react from 'react'

function Navbar(){
    return(
        <div class="bg-gradient-to-r from-fuchsia-600 to-purple-600">
                <div class="relative z-10">
        <nav className="sticky top-0 z-10 backdrop-blur">
          <div className="max-w-5xl mx-auto px-4" style={{ maxWidth: "none" }}>
            <div className="flex items-center justify-between h-16">
              <span
                className="text-2xl text-white-900 font-semibold"
                id="spanNavbar"
              >
                Logo 
              </span>
              <div className="flex space-x-4 text-white-900" id="navbar">
                <div className="navPack">
                  <div className="nav_menu">
                    <a href="#">HOME</a>
                  </div>
                  <div className="nav_menu">
                    <a href="#">ABOUT</a>
                  </div>
                  <div className="nav_menu">
                    <a href="#">ORGANISATIONS</a>
                  </div>
                </div>
                {/* <div className='nav_menu'><a href="#"></a></div> */}

                <div className="login_buttons">
                  <button
                    type="button"
                    class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                   
                  >
                    LOGIN{" "}
                  </button>
                  <button
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    
                  >
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      CREATE YOUR ACCOUNT
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        </div >
        </div>
    )
}

export default Navbar