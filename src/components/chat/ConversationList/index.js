import React from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import { allChats } from '../../../features/chatsApiSlice';
import './ConversationList.css';
import { useSelector } from 'react-redux';

export default function ConversationList() {
  const chats = useSelector(allChats)
  
  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[
          <ToolbarButton key="cog" icon="ion-ios-cog" />
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        ]}
      />
      {/* <ConversationSearch /> */}
      {
        chats?.map(conversation =>
          <ConversationListItem
            key={conversation.id}
            data={conversation}
          />
        )
      }
    </div>
  );
}