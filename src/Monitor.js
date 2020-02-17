import React from 'react';

const URL = 'ws://127.0.0.1:9814/yo/';

export const Monitor = (props) => {
  const {id} = props;
  const [socket, setWebsocket] = React.useState(() => new WebSocket(URL));
  const [msgs, setMessages] = React.useState([]);

  socket.onmessage = e => {
    const text = JSON.parse(e.data)['message'];
    setMessages([text, ...msgs]);
  };

  const ping = () => {
    socket.send(JSON.stringify({
      message: 'ping!',
    }));
  };

  return <div className="monitor">
    <h2>Monitor #{id}</h2>
    <ul>
      {msgs.map((s, i) => <li key={i}>
        {s}
      </li>)}
    </ul>
    <button onClick={ping}>PING</button>

  </div>;
};


