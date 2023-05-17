import './App.css';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { DateTime } from 'luxon';
import LuckSkywalker from './Smiles/LuckSkywalker.png';
import DarthVader from './Smiles/DarthVader.png';
import ObiWanKenobi from './Smiles/ObiWanKenobi.png';
import R2D2 from './Smiles/R2D2.png';
import C3PO from './Smiles/C3PO.png';

function App() {
  const [message, setMessage] = useState('');
  const [sentMsg, setSentMsg] = useState([]);
  const [nickName, setNickName] = useState('');

  const nickNames = [
    'Luck Skywalker',
    'Dart Vader',
    'Obi-Wan Kenobi',
    'R2-D2',
    'C-3PO',
  ];

  const avatars = {
    'Luck Skywalker': LuckSkywalker,
    'Dart Vader': DarthVader,
    'Obi-Wan Kenobi': ObiWanKenobi,
    'R2-D2': R2D2,
    'C-3PO': C3PO,
  };

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

  const handlechange = e => {
    setMessage(e.target.value);
    if (e.target.value.trim() && nickName) {
      sendBtnActive();
    } else {
      sendBtnDisabled();
    }
  };

  const handlechangeSelect = e => {
    setNickName(e.target.value);
    if (message) {
      sendBtnActive();
    }
  };

  const sendBtnDisabled = () => {
    document.querySelector('#sendBtn').disabled = true;
  };
  const sendBtnActive = () => {
    document.querySelector('#sendBtn').disabled = false;
  };

  const reset = () => {
    setMessage('');
    setNickName('');
    sendBtnDisabled();
  };

  return (
    <>
      <div className='container'>
        <div className='mainScreen'>
          <ul className='allMessage'>
            {sentMsg.map(msg => (
              <li key={nanoid()} className='item'>
                <div className='avatarContainer'>
                  <img
                    src={avatars[msg.nickName]}
                    alt='avatar'
                    className='avatar'
                  />
                </div>
                <p className='nickName'>{msg.nickName}</p>
                <div className='messageContainer'>
                  <span className='message'>{msg.message} </span>
                  <span className='sendTime'>{msg.currentTime}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form className='messageField' onSubmit={handleSubmit}>
          <input
            type='text'
            className='inputField'
            onChange={handlechange}
            value={message}
            onKeyDown={onKeyDown}
            placeholder='Enter your message'
          />
          <select
            value={nickName}
            onChange={handlechangeSelect}
            className='selectField'
            onKeyDown={onKeyDown}
          >
            <option disabled hidden value=''>
              Choose nickName
            </option>
            {nickNames.map(name => (
              <option key={nanoid()} value={name}>
                {name}
              </option>
            ))}
          </select>

          <button id='sendBtn' type='submit' className='sendBtn' disabled>
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
