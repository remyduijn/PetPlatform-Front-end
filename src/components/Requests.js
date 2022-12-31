import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import '../styles/Requests.css';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_TYPE_REQUESTED_REQUESTS } from '../constants/requestTypeConstants';
import { FetchRequestedRequestsApi, FetchVolunteeredRequestsApi, markedAsFullfilledData, markedRequestAsFullfilledApi } from '../features/getRequestsApiSlice';


const Requests = ({requests , requestType}) => {
  const dispatch = useDispatch()
  const markedAsFullfilled = (id) => {
    dispatch(markedRequestAsFullfilledApi({id, requestType}))
  }
  // const rePublishRequest = () => {
  //    console.log("Resend")
  // }
  return (
    <>
      <Table striped className='requestsTable'>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((currRequesterData , index) => {
            return (
              <>
                <tr>
                  <td>{index +1}</td>
                  <td>{currRequesterData?.user?.name}</td>
                  <td>{currRequesterData?.user?.last_name}</td>
                  <td>{currRequesterData?.request_type}</td>
                  <td>{currRequesterData?.description}</td>
                  <td>{currRequesterData?.status === "unfulfilled" ? <tb className="d-flex align-content-center"><button className='btn btn-sm fulfillButton' onClick={()=>markedAsFullfilled(currRequesterData?.id)}>Mark as Fulfilled</button></tb> : <tb className="d-flex align-content-center">{currRequesterData?.status}</tb>}</td>
                  {/* {requestType === REQUEST_TYPE_REQUESTED_REQUESTS ?  <tb className="d-flex align-content-center"><button className='btn btn-success btn-sm' onClick={()=>rePublishRequest()}>ReSend</button></tb> : null} */}
                </tr>
              </>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
export default Requests