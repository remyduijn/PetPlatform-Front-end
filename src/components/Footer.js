import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBRipple
} from 'mdb-react-ui-kit';
import '../styles/Footer.css';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
import img3 from '../images/img3.jpg';
import img4 from '../images/img4.jpg';
import img5 from '../images/img5.jpg';
import img6 from '../images/img6.jpg';

export default function App() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#caced1' }}>
      <MDBContainer className='p-4'>
          <MDBRow className='mb-1'>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
              <div className='rounded'>
                <img src={img1} className='w-100' />
              </div>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
                <div className='rounded'>
                <img src={img3} className='w-100' />
              </div>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
            <div className='rounded'>
                <img src={img2} className='w-100' />
              </div>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
            <div className='rounded'>
                <img src={img5} className='w-100' />
              </div>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
            <div className='rounded'>
                <img src={img6} className='w-100' />
              </div>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4 mb-md-0'>
            <div className='rounded'>
                <img src={img4} className='w-100' />
              </div>
            </MDBCol>
          </MDBRow>
      </MDBContainer>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright 🐕 Pet Platform 
      </div>
    </MDBFooter>
  );
}