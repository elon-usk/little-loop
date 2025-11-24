import React from "react";
import Seo from "../components/Seo.jsx";

export default function Community() {
  return (
    <>
      <Seo
        title="Comunitatea LittleLoop"
        description="Participă la evenimentele, picnicurile și grupurile de sprijin LittleLoop și conectează-te cu părinții care împărtășesc aceleași valori."
        path="/comunitate"
      />
      <main id="main" className="section container">
        <h2>Comunitatea LittleLoop</h2>
        <p>
          Creăm legături, susținem și inspirăm. Alătură-te evenimentelor noastre,
          workshopurilor, întâlnirilor și grupurilor dedicate părinților ca tine!
        </p>
        <ul className="bullets">
          <li>Evenimente locale: ateliere, picnicuri, întâlniri tematice.</li>
          <li>Grupuri de sprijin și discuții online sau în persoană.</li>
          <li>Newsletter cu inspirație și noutăți.</li>
          <li>Testimoniale, povești reale și resurse create împreună.</li>
        </ul>
      </main>
    </>
  );
}
