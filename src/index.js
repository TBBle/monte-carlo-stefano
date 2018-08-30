import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactModal.setAppElement('#root');
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
