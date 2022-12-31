import { useEffect, useState } from "react"
import Navigation from "./Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { CommunityFormApiData } from "../features/communityFormApiSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.js"
import '../styles/Dashboard.css';

const CommunityForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [description, setDescription] = useState("")
  const [cooardinate, setCooardinates] = useState([])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCooardinates({
          "latitude": position.coords.latitude,
          "longitude": position.coords.longitude
        })
      });
    }
  }, [])

  const onSubmitForm = (e) => {
    e.preventDefault()
    const communityRequest = {
      request_type: type,
      description: description,
      lat: (cooardinate?.latitude),
      lng: (cooardinate?.longitude)
    }
    if (communityRequest.lat && communityRequest.lng) {
      dispatch(CommunityFormApiData(communityRequest))
      toast("Successfully Submitted")
      navigate('/')
      handleIncrement()
    }
    else {
      toast('You need to allow the location permission in order to see the requests around your current location')
    }
    setType('')
    setDescription('')
  }

  const [count, setCount] = useState(0);
  const KEY = `key`;
  
  useEffect(() => {
    const parsedCount = Number(localStorage.getItem(KEY) || 0)
    setCount(parsedCount)
  }, [])
  
  useEffect(() => {
    localStorage.setItem(KEY, count)
  }, [count])
  
  const handleIncrement = () => {
    console.log("succes")
    setCount = (prevCount => prevCount + 1)
  }

  return (
    <>
      <Navigation />
      <ToastContainer />
      <div className="d-flex justify-content-center mt-2">
        <div className="col-6">
          <h1 className="my-4 text-center">Community Help</h1>
          <form className="communityForm" onSubmit={(e) => onSubmitForm(e)}>
            <div className="mb-2">
              <label>Type</label>
              <select className="form-select" 
                aria-label="Default select example"
                value={type}
                required
                onChange={e => setType(e.target.value)}>
                <option value="">Choose a task you require</option>
                <option value="One-time task">One-time task</option> 
                <option value="Homestay">Homestay</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Description</label>
              <textarea className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={description}
                required
                onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <input type="submit" value="Submit" className="mt-3 btn submit text-white"></input>
          </form>
        </div>
      </div>
      <div className='height'></div>
      <Footer />
    </>
  );
};

export default CommunityForm;
