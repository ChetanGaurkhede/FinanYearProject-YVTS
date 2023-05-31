import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TextSummarizer from './TextSummarizer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/summary" element={< TextSummarizer/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  root
);
