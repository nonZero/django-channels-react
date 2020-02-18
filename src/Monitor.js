import React from 'react';

const URL = 'ws://127.0.0.1:9814/yo/';

export const Monitor = (props) => {
  const {id} = props;
  const [name, setName] = React.useState();
  const [socket, setWebsocket] = React.useState(() => new WebSocket(URL));
  const [enabled, setEnabled] = React.useState(false);
  const [msgs, setMessages] = React.useState([]);

  const addMessage = (msg) => setMessages([msg, ...msgs]);

  socket.onopen = e => {
    addMessage('Socket open :-)');
    setEnabled(true);
  };

  socket.onclose = e => {
    addMessage('Socket closed. Bye!');
    setEnabled(false);
  };

  socket.onmessage = e => {
    const data = JSON.parse(e.data);
    const {type, uid, message} = data;
    console.log(message);
    if (type === 'welcome') {
      setName(uid);
    }
    addMessage(`${uid}#${type}: ${message || ''}`);
  };

  const ping = () => {
    socket.send(JSON.stringify({
      message: `ping from ${id}`,
    }));
  };

  return <div className="monitor">
    {enabled ? <button onClick={ping}>Send ping</button> : ''}
    <h2>Monitor #{id}: {name || '?'}</h2>
    <ul>
      {msgs.map((s, i) => <li key={i}>
        {s}
      </li>)}
    </ul>

  </div>;
};


