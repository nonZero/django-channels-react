import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import './styles.css';

const url = `ws://${window.location.host}/ws/monitor/`;
// console.log(`WEBSOCKET URL: ${url}`);

const mountNode = document.getElementById('app');
ReactDOM.render(<App url={url}/>, mountNode);
