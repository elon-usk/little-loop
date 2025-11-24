import React from "react";
import Seo from "../components/Seo.jsx";

export default function Mission() {
  return (
    <>
      <Seo
        title="Misiunea LittleLoop"
        description="Susținem familiile din București cu programe pentru starea de bine, educație prin joc și business-uri locale cu impact pozitiv."
        path="/misiune"
      />
      <main id="main" className="section container">
        <h2>Misiunea noastră</h2>
        <p>
          Încurajăm gândirea critică, dialogul deschis și susținem business-uri din
          comunitate cu impact pozitiv. Ne dorim familii conectate, informate și inspirate.
        </p>
        <ul className="bullets">
          <li>Programe pentru starea de bine a familiei.</li>
          <li>Educație prin joc și creativitate.</li>
          <li>Resurse curate, prietenoase și utile.</li>
        </ul>
      </main>
    </>
  );
}
