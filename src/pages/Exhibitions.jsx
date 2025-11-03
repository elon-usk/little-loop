import React from "react";

export default function Exhibitions() {
  return (
    <main id="main" className="section container">
      <h2>Expoziții</h2>
      <div className="grid grid-2">
        <article className="card">
          <img
            src="https://picsum.photos/seed/expo-now/1200/700"
            alt="Expoziție curentă"
            loading="lazy"
          />
          <div className="body">
            <h3>Expoziție curentă: Materialități urbane</h3>
            <p>Instalație, fotografie și sunet. 12 septembrie – 20 noiembrie.</p>
          </div>
        </article>
        <article className="card">
          <img
            src="https://picsum.photos/seed/expo-next/1200/700"
            alt="Expoziție viitoare"
            loading="lazy"
          />
          <div className="body">
            <h3>În curând: Ecologii afective</h3>
            <p>
              Program multimedia despre memorie, mediu și apartenență. Din 5 decembrie.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
