import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api'

spotifyApi.token = 'BQCr4WlU1AlSmtzdkvKQ7jKoLG0JUJvSZlyzbJ1N-nmnYGm_8utbpuc3Sz-gyEEobTVZsMh-1b5Tin-lLVsEplq4thzKGbn-tL0nVeRXJSTRI160BnC7uimMcwxL3wUNAOP_mptR4JG6qm0'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
