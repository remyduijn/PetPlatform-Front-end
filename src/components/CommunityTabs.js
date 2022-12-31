import React, { useEffect, useState } from "react"
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useDispatch, useSelector } from "react-redux";
import { REQUEST_TYPE_REQUESTED_REQUESTS, REQUEST_TYPE_VOLUNTEERED_REQUESTS } from "../constants/requestTypeConstants";
import { allRequestedRequests, allVolunteeredRequests, FetchRequestedRequestsApi, FetchVolunteeredRequestsApi } from "../features/getRequestsApiSlice";
import Requests from './Requests'; 
import '../styles/Tabs.css'

function CommunityTabs() {
  const dispatch = useDispatch()
  const requestedRequests = useSelector(allRequestedRequests)
  const volunteeredRequests =useSelector(allVolunteeredRequests)
  const [requestType , setRequestType] = useState(REQUEST_TYPE_REQUESTED_REQUESTS)
  useEffect(() => {
    dispatch(FetchRequestedRequestsApi())
    dispatch(FetchVolunteeredRequestsApi())
  }, [])

  return ( 
    <>
      <div class="container mt-5 shadow p-3 bg-white rounded" >
        <Tab.Container id="left-tabs-example" defaultActiveKey="requestedRequests">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="requestedRequests" className='text-dark' onClick={()=> setRequestType(REQUEST_TYPE_REQUESTED_REQUESTS)}>Submitted Requests</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="volunteeredRequests" className='text-dark' onClick={()=> setRequestType(REQUEST_TYPE_VOLUNTEERED_REQUESTS)}>Volunteered Requests</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className="content">
                <Tab.Pane eventKey="requestedRequests">
                  <Requests requests={requestedRequests} requestType={requestType}/>
                </Tab.Pane>
                <Tab.Pane eventKey="volunteeredRequests">
                  <Requests requests={volunteeredRequests} requestType={requestType}/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}

export default CommunityTabs;