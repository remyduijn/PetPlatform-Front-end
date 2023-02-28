import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'
const user = Cookies.get('user')
export const CommunityFormApiData = createAsyncThunk('data/CommunityFormApiData', async (communityRequest) => {
  return axios
    .post(`http://localhost:3001/requests`, {
      community_request: communityRequest,
      session: {user_id: user} // not needed
    },
    { withCredentials: true }).then(response => response.data)
})

export const getCommunityFormApiData = createAsyncThunk('volunteerData/getCommunityFormApiData', async () => {
  return axios
    .get(`http://localhost:3001/requests`)
    .then(response => response.data)
})

const communityFormApiSlice = createSlice({
  name: 'communityFormApiData',
  initialState: {
    loading: false,
    data: [],
    error: '',
    volunteerData:[],
    selectedVolunteer:{}
  },
  
  reducers: {
    setSelectedVolunteer: (state, action) => {
      state.selectedVolunteer = action.payload
    }
  },
  extraReducers: {
    [CommunityFormApiData.pending]: (state) => {
      // console.log("pending")
      return { ...state, loading: true }
    },
    [CommunityFormApiData.fulfilled]: (state, { payload }) => {
      // console.log('successfull')
      return { ...state, data: payload };
    },
    [CommunityFormApiData.rejected]: (state) => {
      console.log("rejected")
      return { ...state, error: "error" }
    },
    [getCommunityFormApiData.fulfilled]: (state, { payload }) => {
      return { ...state, volunteerData: payload };
    },
  }
})

export const { setSelectedVolunteer } = communityFormApiSlice.actions;
export const selectedVolunteerData = (state) => state.communityFormApiData.selectedVolunteer
export const alldata = (state) => state.communityFormApiData.data;
export const allVolunteerData = (state) => state.communityFormApiData.volunteerData
export default communityFormApiSlice.reducer
