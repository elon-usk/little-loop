import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footgrid">
        <div>
          <div className="brand">littleloop.ro</div>
          <p className="muted">© {new Date().getFullYear()} Toate drepturile rezervate.</p>
        </div>
        <div className="muted">
          <p>București</p>
          <p>
            <a className="link" href="/comunitate.html">Comunitate</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
