import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ConversationList from '../components/chat/ConversationList';
import '../components/chat/Messenger/Messenger.css';
import Navigation from '../components/Navbar';
import { fetchChatsApiData } from '../features/chatsApiSlice';

export default function ChatRoom () {
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(fetchChatsApiData())
  },[])
  return (
    <>
    <Navigation/>
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList />
      </div>
    </div>
    </>
    );
}