import React from "react";
import Seo from "../components/Seo.jsx";

export default function Activities() {
  return (
    <>
      <Seo
        title="Activități pentru părinți și copii"
        description="Găsește inspirație pentru joacă, ateliere creative, ieșiri în natură și provocări de sezon care conectează întreaga familie."
        path="/activitati"
      />
      <main id="main" className="section container">
        <h2>Activități pentru părinți și copii</h2>
        <p>Idei, inspirație și materiale pentru joacă, creativitate și conectare:</p>
        <ul className="bullets">
          <li>Ateliere de creație: pictură, colaje, lucru manual.</li>
          <li>Jocuri educative pentru dezvoltare emoțională.</li>
          <li>Ghiduri pentru ieșiri în natură, excursii în familie.</li>
          <li>Momente de mindfulness și respirație pentru întreaga familie.</li>
          <li>Provocări lunare cu tematică de sezon.</li>
        </ul>
      </main>
    </>
  );
}
