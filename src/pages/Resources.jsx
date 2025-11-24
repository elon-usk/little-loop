import React from "react";
import Seo from "../components/Seo.jsx";

export default function Resources() {
  return (
    <>
      <Seo
        title="Resurse pentru familii"
        description="Review-uri, recomandări sustenabile și ghiduri create de părinții LittleLoop pentru un stil de viață echilibrat."
        path="/resurse"
      />
      <main id="main" className="section container">
        <h2>Resurse utile</h2>
        <p>Review-uri de produse, recomandări sustenabile, idei pentru sprijin local:</p>
        <ul className="bullets">
          <li>Jucării, cărți, mobilier, produse sustenabile.</li>
          <li>Lista business-urilor locale recomandate de părinți.</li>
          <li>Articole "how-to" pentru parenting modern și implicat.</li>
          <li>Ghiduri pentru o viață de familie sustenabilă și sănătoasă.</li>
        </ul>
      </main>
    </>
  );
}
