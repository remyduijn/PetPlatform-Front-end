import React from 'react'
import CommunityTabs from '../components/CommunityTabs';
import Navigation from '../components/Navbar';
import Footer from "../components/Footer.js"
import '../styles/Dashboard.css';

const Dashboard = props => {
  return (
    <div>
      <Navigation />
      {/* <div>
        <h2>Dashboard</h2>
        <h2>Status: {props.loggedInStatus}</h2>
        <h2>User: {props.user}</h2>
      </div> */}
      <CommunityTabs/>
      <div className='height'></div>
      <Footer/>
    </div>
  );
}

export default Dashboard;