import React from "react";

export default function Visit() {
  return (
    <main id="main" className="section container">
      <h2>Vizitează-ne</h2>
      <div className="visit">
        <div>
          <h3>Adresă</h3>
          <p>
            Str. Exemplu 12, Et. 1, București<br />
            Marți–Duminică: 12:00–19:00 · Luni închis
          </p>
          <h3>Bilete</h3>
          <p>Intrare liberă pentru elevi și studenți. Tarif general: 20 RON.</p>
        </div>
        <div className="map">
          <img src="https://picsum.photos/seed/map/640/360" alt="Hartă – locația centrului" />
        </div>
      </div>
    </main>
  );
}
