import React from 'react'
import avatar from './images/avatar.png'
import badge from './images/badges.webp'

export default function AuthedState(props) {
  return (
    <div className='login_buttons'>
        <button id="badgeNameButton" class="flex items-center text-sm font-medium text-white-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
    <span class="sr-only">Open user menu</span>
    <img class="w-12 h-12 mr-2 rounded-full" src={badge} alt="baby with headphones"></img>
    <p style={{marginRight: '2em'}}>570 COINS</p>
</button>
      <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" class="flex items-center text-sm font-medium text-white-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white" type="button">
    <span class="sr-only">Open user menu</span>
    <img class="w-12 h-12 mr-2 rounded-full" src={avatar} alt="baby with headphones"></img>
    {props.name}
    <svg class="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</button>
<div id="dropdownAvatarName" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div class="py-2">
      <button type='button' onClick={props.fcl.unauthenticate} id="signOutButton" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
    </div>
</div>
    </div>
  )
}
