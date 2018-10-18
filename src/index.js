import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './CommentApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App><div className='name'>My Name：Lucy</div>
<p className='age'>
  My Age：<span>12</span>
</p></App>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
