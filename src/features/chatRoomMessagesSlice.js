import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'
const user=Cookies.get('user')

export const createCurrentChatMessageApi = createAsyncThunk('currentChatMessage/createCurrentChatMessageApi',
  async (message) => {
    return axios
      .post(`http://localhost:3001/chat_rooms/${message?.chat_room_id}/messages`, {
        message: message,
        id: message.chat_room_id,
        session: {user_id: user} // not needed
      },
        { withCredentials: true })
      .then(response => console.log(response.data))
  })

const currentChatMessageApiSlice = createSlice({
  name: 'currentChatMessageApiData',
  initialState: {
    loading: false,
    currentChatMessage: [],
    error: '',
    lastMessage: {}
  },
  reducers: {
    setCurrentChatMessage: (state, action) => {
      state.currentConversation = action.payload
    },
    setLastMessage: (state, action) => {
      state.lastMessage = action.payload
    }
  },
  extraReducers: {
    [createCurrentChatMessageApi.pending]: (state) => {
      // console.log("pending")
      return { ...state, loading: true }
    },
    [createCurrentChatMessageApi.fulfilled]: (state, { payload }) => {
      // console.log('successfull')
      return { ...state, currentChatMessages: payload };
    },
    [createCurrentChatMessageApi.rejected]: (state) => {
      console.log("rejected", state)
      return { ...state, error: "error" }
    }
  }
})

export const currentChatMessageData = (state) => state.currentChatMessageApiData.currentChatMessage;
export const lastMessageData = (state) => state.currentChatMessageApiData.lastMessage
export const { setCurrentChatMessage , setLastMessage} = currentChatMessageApiSlice.actions
export default currentChatMessageApiSlice.reducer
