import React from 'react';

export const Monitor = (props) => {
  const {id, url} = props;
  const [name, setName] = React.useState();
  const [socket, setWebsocket] = React.useState(() => new WebSocket(url));
  const [enabled, setEnabled] = React.useState(false);
  const [msgs, setMessages] = React.useState([]);
  const [text, setText] = React.useState('ping');

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
    const {action, uid, message} = data;
    if (action === 'welcome') {
      setName(uid);
    }
    addMessage(`${uid}#${action}: ${message || ''}`);
  };

  const onSubmit = event => {
    socket.send(JSON.stringify({
      message: text,
    }));
    event.preventDefault();
  };

  return <div className="monitor">
    {enabled ? <form className="right" onSubmit={onSubmit}>
      <input value={text} onChange={e => setText(e.target.value)}/>
      <button>Send</button>
    </form> : ''}
    <h2>Monitor #{id}: {name || '?'}</h2>
    <ul>
      {msgs.map((s, i) => <li key={i}>
        {s}
      </li>)}
    </ul>

  </div>;
};
