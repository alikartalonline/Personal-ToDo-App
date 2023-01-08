import React from 'react'

function Footer({ setSelected }) {


  return (
    <footer style={{marginTop:"20%"}} className="sticky-bottom">
        <button className='btn text-white btn1' onClick={() => setSelected("All") }>All</button>
        <button className='btn btn2 border-0' onClick={() => setSelected("Active") }>Active</button>
        <button className='btn btn3' onClick={() => setSelected("Completed") }>Completed</button>
    </footer>
  )
}

export default Footer;