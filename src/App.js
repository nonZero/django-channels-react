import React from 'react';
import {Monitor} from './Monitor';

let monitorId = 1;

export const App = (props) => {

  const [monitors, setMonitors] = React.useState(() => [
      <Monitor key={monitorId++}/>,
      <Monitor key={monitorId++}/>,
  ]);

  const addMonitor = function() {
    setMonitors([<Monitor key={monitorId++}/>, ...monitors]);
  };

  return <div className="app">
    {monitors}
    <button onClick={addMonitor}>Add Monitor</button>
  </div>;

};


