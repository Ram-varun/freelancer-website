import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getServiceDetails } from '../../service/service';
import "./serviceDetails.css"

export const ServiceDetails = (props) => {
    const { id } = useParams();
    const [details, setDetails] = useState({})

    useEffect(() => {
        getServiceDetails(id).then(({ data }) => setDetails(data.data[0]))
    }, [])

    console.log(details);
    console.log(id);
    return (
        <div className='serviceDetailPage'>
            <span className='fs20'><b>{details.serviceName}</b></span>
            <br />
            <br />
            <img src={details.pictureLink} height="400px" />
            <br />
            <br />
            <h3 className='fs20'><b>Service Description</b></h3>
            <p className='fs20'>
                {
                    details.serviceDescription
                }
            </p>
            <br />
            <div>
                <span>
                    <b className='fs20'>Price: Rs. {details.price}</b>
                </span>
            </div>
            <br />
            <br />
            <div>
                <span>
                    <b className='fs20'>UPI Id: {details.upiId}</b>
                </span>
            </div>
            <br />
            <br />
            <div>
                <span>
                    <b className='fs20'>Email Id: {details.emailId}</b>
                </span>
            </div>
            <br />
            <br />
            <div>
                <span>
                    <b className='fs20'>Note: If you want this service, please send amount to above UPI Id and mail me the screenshot of the transaction. Then I'll take your order and will give you.</b>
                </span>
            </div>
        </div>
    )
}
