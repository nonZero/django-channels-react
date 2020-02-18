import React from 'react';
import {Monitor} from './Monitor';

let monitorId = 1;

export const App = (props) => {
  const addMonitor = function(x) {
    const newId = monitorId++;
    return [<Monitor key={newId} id={newId}/>, ...x];
  };

  const [monitors, setMonitors] = React.useState(() => {
    let x = [];
    x = addMonitor(x);
    x = addMonitor(x);
    return x;
  });

  return <div className="app">
    <button onClick={() => setMonitors(addMonitor(monitors))}>Add Monitor</button>
    {monitors}
  </div>;

};


