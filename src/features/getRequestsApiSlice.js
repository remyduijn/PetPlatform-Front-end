import { createSlice, createAsyncThunk, applyMiddleware } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../store";
import Cookies from 'js-cookie';
import { REQUEST_TYPE_REQUESTED_REQUESTS, REQUEST_TYPE_VOLUNTEERED_REQUESTS } from "../constants/requestTypeConstants";

export const FetchRequestedRequestsApi = createAsyncThunk('requestedRequests/FetchRequestedRequestsApi', async () => {
  return axios
  .get("http://localhost:3001/requests/requested", { withCredentials: true })
  .then(response => response.data)
})

export const FetchVolunteeredRequestsApi = createAsyncThunk('volunteeredRequests/FetchVolunteeredRequestsApi', async () => {
  return axios
  .get("http://localhost:3001/requests/volunteered", { withCredentials: true })
  .then(response => response.data)
})

export const markedRequestAsFullfilledApi = createAsyncThunk('markedAsFullfilledData/markedRequestAsFullfilledApi', async ({id , requestType}) => {
  return axios
  .delete(`http://localhost:3001/requests/${id}`, { withCredentials: true })
  .then(response => response.data)
  
  .put(`http://localhost:3001/requests/${id}/mark_fulfilled` , {
  }).then(response => {
    if(requestType === REQUEST_TYPE_REQUESTED_REQUESTS){
      store.dispatch(FetchRequestedRequestsApi())
      
    }else if(requestType === REQUEST_TYPE_VOLUNTEERED_REQUESTS){
      store.dispatch(FetchVolunteeredRequestsApi())
    }
    return response.data
  })
})
 
const requestsApiSlice = createSlice({
  name: 'requestsData',
  initialState: {
    requestedRequests: [],
    volunteeredRequests: [],
    markedAsFullfilledData : {},
    loading: false,
    error: '',
  },
  reducers: {
    setMarkedAsFullfilledData: (state) => {
      state.markedAsFullfilledData = []
    }
  },
  extraReducers: {
    [FetchRequestedRequestsApi.pending]: (state) => {
      return { ...state, loading: true }
    },
    [FetchRequestedRequestsApi.fulfilled]: (state, { payload }) => {
      return { ...state, requestedRequests: payload};
    },
    [FetchRequestedRequestsApi.rejected]: (state) => {
      console.log("rejected")
      return { ...state, error: "error" }
    },
    [FetchVolunteeredRequestsApi.fulfilled]: (state, { payload }) => {
      return { ...state, volunteeredRequests: payload };
    },
    [markedRequestAsFullfilledApi.fulfilled]: (state, { payload }) => {
      return { ...state, markedAsFullfilledData: payload };
    },
  }
})

export const allRequestedRequests = (state) => state.requestsData.requestedRequests
export const allVolunteeredRequests = (state) => state.requestsData.volunteeredRequests
export const { setMarkedAsFullfilledData } = requestsApiSlice.actions;
export const markedAsFullfilledData = (state) => state.requestsData.markedAsFullfilledData
export default requestsApiSlice.reducer
