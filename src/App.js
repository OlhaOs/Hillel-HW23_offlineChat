import './App.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { DateTime } from 'luxon';

function App() {
  const [message, setMessage] = useState('');
  const [sentMsg, setSentMsg] = useState([]);
  const [nickName, setNickName] = useState('');

  const userProfile = [
    {
      nickName: 'Luck Skywalker',
      avatar: '/avatars/LuckSkywalker.png',
    },
    { nickName: 'Dart Vader', avatar: '/avatars/DarthVader.png' },
    { nickName: 'Obi-Wan Kenobi', avatar: '/avatars/ObiWanKenobi.png' },
    { nickName: 'R2-D2', avatar: '/avatars/R2D2.png' },
    { nickName: 'C-3PO', avatar: '/avatars/C3PO.png' },
  ];

  const handleSubmit = e => {
    e.preventDefault();
    const currentTime = DateTime.local().toFormat('HH:mm:ss');
    const newMsg = {
      message,
      nickName,
      currentTime,
    };

    setSentMsg(prevstate => [...prevstate, newMsg]);
    reset();
  };

  const onKeyDown = e => {
    if (e.key === 'Enter') {
      if (e.target.value.trim() && nickName && message) {
        handleSubmit(e);
      }
    }
  };

  const reset = () => {
    setMessage('');
    setNickName('');
  };

  return (
    <>
      <div className='container'>
        <div className='mainScreen'>
          <ul className='allMessage'>
            {sentMsg.map(msg => {
              const user = userProfile.find(
                profile => profile.nickName === msg.nickName
              );

              // const avatarSrc = user ? user.avatar : '';
              const avatarSrc = user
                ? `${process.env.PUBLIC_URL}/${user.avatar}`
                : '';
              return (
                <li key={nanoid()} className='item'>
                  <div className='avatarContainer'>
                    <img src={avatarSrc} alt='avatar' className='avatar' />
                  </div>
                  <p className='nickName'>{msg.nickName}</p>
                  <div className='messageContainer'>
                    <span className='message'>{msg.message} </span>
                    <span className='sendTime'>{msg.currentTime}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <form className='messageField' onSubmit={handleSubmit}>
          <input
            type='text'
            className='inputField'
            onChange={e => setMessage(e.target.value)}
            value={message}
            onKeyDown={onKeyDown}
            placeholder='Enter your message'
          />
          <select
            value={nickName}
            onChange={e => setNickName(e.target.value)}
            className='selectField'
            onKeyDown={onKeyDown}
          >
            <option hidden value=''>
              Choose nickName
            </option>
            {userProfile.map(name => (
              <option key={name.nickName} value={name.nickName}>
                {name.nickName}
              </option>
            ))}
          </select>

          <button
            type='submit'
            className='sendBtn'
            disabled={!message || !nickName}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
