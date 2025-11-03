import React from "react";

const programs = [
  {
    title: "Ateliere pentru adulți",
    description: "Pictură, sculptură și instalație cu mentori consacrați.",
  },
  {
    title: "Ateliere pentru copii",
    description: "Explorare creativă prin joc, culoare și storytelling.",
  },
  {
    title: "Rezidențe artistice",
    description: "Spațiu, timp și mentorat pentru artiști emergenți.",
  },
  {
    title: "Conferințe și discuții",
    description: "Dialoguri deschise cu artiști, curatori și pedagogi.",
  },
  {
    title: "Seară de film",
    description: "Proiecții tematice urmate de sesiuni Q&A cu invitați.",
  },
  {
    title: "Tururi ghidate",
    description: "Parcurgeri comentate pentru grupuri și familii curioase.",
  },
];

export default function Programs() {
  return (
    <main id="main" className="section container">
      <h2>Programe</h2>
      <p className="lead">
        Activități pentru toate vârstele și nivelurile de experiență artistică.
      </p>
      <div className="grid">
        {programs.map((program, index) => (
          <article key={program.title} className="card">
            <img
              src={`https://picsum.photos/seed/program-${index}/800/520`}
              alt="Imagine program"
              loading="lazy"
            />
            <div className="body">
              <h3>{program.title}</h3>
              <p>{program.description}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
