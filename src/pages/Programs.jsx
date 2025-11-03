import React from "react";

export default function Programs() {
  const items = [
    { t: "Ateliere pentru adulți", d: "Pictură, sculptură, instalație." },
    { t: "Ateliere pentru copii", d: "Explorare creativă prin joc." },
    { t: "Rezidențe artistice", d: "Spațiu, timp și mentorat." },
    { t: "Conferințe și discuții", d: "Dialoguri cu artiști și curatori." },
    { t: "Seară de film", d: "Proiecții tematice și Q&A." },
    { t: "Tururi ghidate", d: "Parcurgeri comentate pentru grupuri." },
  ];
  return (
    <main id="main" className="section container">
      <h2>Programe</h2>
      <p className="lead">Activități pentru toate vârstele și nivelurile de experiență.</p>
      <div className="grid">
        {items.map((item, i) => (
          <article key={i} className="card">
            <img
              src={https://picsum.photos/seed/prog-/800/520}
              alt="Imagine program"
              loading="lazy"
            />
            <div className="body">
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
