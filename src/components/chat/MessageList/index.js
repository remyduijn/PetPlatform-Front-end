import React, {useEffect, useState , useRef} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import { currentConversation, setCurrentConversation, currentConversationmessages, setMessages } from '../../../features/chatsApiSlice';
import { currentChatMessageData } from '../../../features/chatRoomMessagesSlice';

import './MessageList.css';
import { useSelector } from 'react-redux';
import { loggedInUserData } from '../../../features/userSlice';

const MY_USER_ID = 'apple';

export default function MessageList() {
  // const [messages, setMessages] = useState([])
  const currentConversationData = useSelector(currentConversation)
  const currentChatMessages = useSelector(currentChatMessageData)
  const messages = useSelector(currentConversationmessages)

  const loggedInUser = useSelector(loggedInUserData)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(()=>{
    renderMessages()
  },[messages])
  
  let tempMessages = [];
  useEffect(() => {
    scrollToBottom()
  }, [tempMessages]);

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages?.length;

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current?.sender_id == loggedInUser?.id;
      let currentMoment = moment(current?.created_at);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment
        (previous.created_at);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous?.sender_id === current?.sender_id;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }
      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      i += 1;
    }
    return tempMessages;
  }
    return(
      <div className="message-list">
        <Toolbar
          title={currentConversationData?.requester?.id == loggedInUser?.id ? currentConversationData?.volunteer?.name : currentConversationData?.requester?.name }
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">{renderMessages()} <div ref={messagesEndRef} /></div>

        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      </div>
    );
}