import React from 'react';	
import ReactDOM from 'react-dom';	
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';	
import 'antd/dist/antd.css'; 

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.unregister();
// json-server --watch db.json --port 4000 启动sjon-server