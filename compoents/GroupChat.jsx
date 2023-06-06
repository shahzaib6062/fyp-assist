import React from 'react';
import userIcon from '../public/user.png';
import userIcon2 from '../public/user_icon.png';
import Image from 'next/image';

export default function GroupChat(props) {
  console.log('chat in props', props.chats);
  return (
    <div className="box_coment">
      {props.chats.map((chat, key) => (
        <div id="comment_box" key={key}>
          <div className="flex-heading">
            <Image src={userIcon} alt="user" className="img" />
            <p>{chat.UserName}</p>
          </div>
          <div className="comment">
            <p>{chat.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
