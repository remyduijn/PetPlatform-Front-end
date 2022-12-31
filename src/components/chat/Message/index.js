import React from 'react';
import moment from 'moment';
import './Message.css';

export default function Message({ data, isMine, startsSequence, endsSequence, showTimestamp }) {
  const friendlyTimestamp = moment(data?.created_at).format('LLLL');
  return (
    <>
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
          <div className="timestamp">
            {friendlyTimestamp}
          </div>
        }

        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}
          >
            {data?.body}
          </div>
        </div>
      </div>
    </>
  );
}