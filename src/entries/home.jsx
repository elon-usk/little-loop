import React from 'react';
import ReactDOM from 'react-dom/client';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import Home from '../pages/Home.jsx';
import '../styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav brand="littleloop.ro" />
    <Home />
    <Footer />
  </React.StrictMode>
);
