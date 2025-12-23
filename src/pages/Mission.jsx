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
        <h1>Misiunea LittleLoop</h1>
        <p>
          Little Loop există pentru a transforma parenting-ul dintr-o serie de griji
          într-o aventură memorabilă. Credem că o viață fericită este o viață împărtășită.
        </p>
        <p>
          Fie că ești în căutarea unui loc de joacă unde să-ți poți auzi gândurile,
          a unei comunități care te înțelege sau a unor alegeri sustenabile pentru viitorul
          lor, aici e locul tău.
        </p>
        <p>
          Promovăm gândirea critică, alegerile conștiente și curajul de a crește copii
          liberi. Împletim utilul cu plăcutul, pentru familii care vor să trăiască,
          nu doar să bifeze task-uri.
        </p>
      </main>
    </>
  );
}
