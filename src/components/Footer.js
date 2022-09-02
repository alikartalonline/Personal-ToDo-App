import React from 'react'

function Footer({ setSelected }) {


  return (
    <footer className='foot'>
        <button className='btn text-white' onClick={() => setSelected("All") }>All</button>
        <button className='btn text-white' onClick={() => setSelected("Active") }>Active</button>
        <button className='btn text-white' onClick={() => setSelected("Completed") }>Completed</button>
    </footer>
  )
}

export default Footer