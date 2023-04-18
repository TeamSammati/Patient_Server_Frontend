import React from 'react'
import './Stylesheets/DashboardCards.css'
import hospital1 from '../Images/hospital(1).jpeg';
import hospital2 from '../Images/hospital(2).jpeg';
const DashboardCards = ({no_hospitals}) => {
    return (
        <div className='cardsPage'>
            <div className="main">
                <ul className="cards">
                    <li className="cards_item">
                        <div className="card">
                            <div className="card_image"><img src={hospital1}/></div>
                            <div className="card_content">
                                <h2 className="card_title">Hospitals Registered</h2>
                                <p className="card_text" style={{fontSize:"50px", textAlign:"center"}}>{no_hospitals}</p>
                                <button className="btn card_btn">View Hospitals</button>
                            </div>
                        </div>
                    </li>
                    <li className="cards_item">
                        <div className="card">
                            <div className="card_image"><img src={hospital2}/></div>
                            <div className="card_content">
                                <h2 className="card_title">Electronic Health Records</h2>
                                <p className="card_text" style={{fontSize:"50px", textAlign:"center"}}>{no_hospitals}</p>
                                <button className="btn card_btn">View Health Records</button>
                            </div>
                        </div>
                    </li>
                    
                </ul>
            </div>

            <h3 className="made_by">Powered By Sammati</h3>
        </div>
    )
}

export default DashboardCards