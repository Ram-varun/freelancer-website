import React from 'react'
// import { useNavigate } from 'react-router-dom'
import './card.css'

export const Card = ({ pictureLink, serviceName, serviceDescription, price, _id }) => {
    // const navigate = useNavigate()
    // const history = useHistory()
    const gotoDetails = () => {
        window.open(`/serviceDetails/${_id}`)
        // history.push('/serviceDetails', { state: "serviceName" })
        // navigate('/serviceDetails', { state: "serviceName" });
    }

    return (
        <div className='service_card' onClick={gotoDetails}>
            <img src={pictureLink} height="300px" />
            <div>
                <h3 className='whiteClr'>{"Service Name: " + serviceName}</h3>
                {/* <p>{serviceDescription}</p> */}
                <b className='whiteClr'>{"Rs: " + price}</b>
            </div>
        </div>
    )
}
