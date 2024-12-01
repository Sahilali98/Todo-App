import React from 'react'

function Navbar() {
    return (
        <nav className='container py-3 flex justify-between bg-blue-950 text-white'>
            <h1>Task</h1>
            <ul className=' flex gap-8'>
                <li className=' cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className=' cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar

