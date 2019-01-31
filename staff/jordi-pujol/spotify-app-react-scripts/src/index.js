import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api-1.0.0'

spotifyApi.token = 'BQANkBgleSVoSEHHztpK4rEJIf9t_gS14EI9Uuf5rQyXh4w86Aq6bwGT7p0e5NMZgGYvmKHlWwqC4LL_0D3h4MCrdecexOSdqvoan9C-1FmeD4EJYQ1jWlQkjhLVCWaGAGwsqMHIaqO3rAs'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
