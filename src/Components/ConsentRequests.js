import React, {useState, useEffect} from 'react'
import './Stylesheets/ConsentRequests.css'
import ConsentRequest from './ConsentRequest'
import EHRRequestService from '../Services/EHRRequestService'
// import consentRequests from '../consentRequestsData.json';
const ConsentRequests = ({ user, consentRequests }) => { // { consentRequests}
  const [healthRecords, setHealthRecords] = useState([])
  //console.log(consentRequests);
  useEffect(() => {
    async function fetchData() {
      if (user) {
        const data = await EHRRequestService.getMyData(user)
        setHealthRecords(data);
        //console.log("Data Records: ", data)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='ConsentRequestsPage'>
      <div className='ConsentRequestTitle'>
        Consent Requests Yet to Sammati
      </div>
      <div className='ConsentRequestContainer'>
        {
          (consentRequests.length === 0) &&
          <div className='ConsentRequestMessage'>
            No Pending Requests
          </div>
        }
        {
          (consentRequests.length !== 0) &&
          <div>
            <table className="ConsentRequestTable">
              <thead>
                <tr>
                  <th scope="col">Sl. No.</th>
                  <th scope="col">Consent Request Id.</th>
                  <th scope="col">Hospital</th>
                  <th scope="col">Doctor</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Accept</th>
                  <th scope="col">Deny</th>
                </tr>
              </thead>
              <tbody>
                {consentRequests.map((consentRequest, index) => (
                  <ConsentRequest
                    {...consentRequest}
                    index={index}
                    key={index}
                    user={user}
                    healthRecords={healthRecords}
                  />
                ))
                }
              </tbody>
            </table>
          </div>
        }

      </div>
    </div>
  )
}

export default ConsentRequests