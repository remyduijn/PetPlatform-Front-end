import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'
const user = Cookies.get('user')

export const fetchChatsApiData = createAsyncThunk('chats/fetchChatsApiData', async () => {
  return axios
  .get("http://localhost:3001/chat_rooms", { withCredentials: true })
    .then(response => response.data)
})

export const fetchCurrentVolunteerData = createAsyncThunk('currentVolunteer/fetchCurrentVolunteerData', async ({ requesterId, communityRequestId }) => {
  return axios
    .post(`http://localhost:3001/chat_rooms`, {
      chat_room: {
        requester_id: requesterId,
        community_request_id: communityRequestId
      },
      session: { user_id: user } // not needed
    },
      { withCredentials: true })
    .then(response => response.data)
})


const chatsApiSlice = createSlice({
  name: 'chatsApiData',
  initialState: {
    loading: false,
    chats: [],
    currentConversationmessages: [],
    error: '',
    currentConversation: {}
  },
  reducers: {
    setCurrentConversation: ((state, action) => {
      state.currentConversation = action.payload
      state.currentConversationmessages = action.payload.messages;
    }),
    setCurrentConversationMessages: ((state, {payload}) => {
      let chat = payload.currentConversationData;
      state.currentConversationmessages = [...chat.messages, payload.message];
    })

  },
  extraReducers: {
    [fetchChatsApiData.pending]: (state) => {
      // console.log("pending")
      return { ...state, loading: true }
    },
    [fetchChatsApiData.fulfilled]: (state, { payload }) => {
      // console.log('successfull' , )
      return { ...state, chats: payload };
    },
    [fetchChatsApiData.rejected]: (state) => {
      console.log("rejected")
      return { ...state, error: "error" }
    },
    [fetchCurrentVolunteerData.fulfilled]: (state, { payload }) => {
      // console.log('successfull', payload)
      return { ...state, currentConversation: payload };
    },
  }
})

export const allChats = (state) => state.chatsApiData.chats;
export const currentConversation = (state) => state.chatsApiData.currentConversation;
export const currentConversationmessages = (state) => state.chatsApiData.currentConversationmessages;
export const { setCurrentConversation, setCurrentConversationMessages } = chatsApiSlice.actions
export default chatsApiSlice.reducer
