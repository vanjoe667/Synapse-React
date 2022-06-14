import React from 'react'
import { Outlet, Link } from "react-router-dom";
import { cards } from '../../config/variables'

const HomeCards = () => {
  return (
    <div className='align-cards'>
        {cards.map(card => {
            return (
                <div className="card" key={card.id}>
                    <Link to={card.link} key={card.id}>
                        <div className="card-img-area">
                            <img src={card.image_url} alt="card-logo" className='card-img'/>
                        </div>
                        <div className="card-label-area">
                            <p className='card-label'>{card.label}</p>
                        </div>
                    </Link>
                </div>
            )
        })}
        <Outlet />
    </div>
  )
}

export default HomeCards