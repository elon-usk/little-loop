import React from "react";
import Seo from "../components/Seo.jsx";

export default function Story() {
  return (
    <>
      <Seo
        title="Povestea LittleLoop"
        description="Descoperă cum a apărut LittleLoop și de ce construim un spațiu cald pentru părinți, mame și copii, cu ghiduri, inspirație și comunitate."
        path="/poveste"
      />
      <main id="main" className="section container">
        <h2>Povestea LittleLoop</h2>
        <p>
          LittleLoop.ro s-a născut din dorința de a fi alături de părinți, în special
          mame, cu ghiduri de activități, recomandări, sfaturi practice, idei de
          sustenabilitate și sprijin real pentru afacerile locale.
        </p>
        <ul className="bullets">
          <li>Redescoperim bucuria de a fi părinte.</li>
          <li>Transformăm provocările în ocazii de creștere și amintiri memorabile.</li>
          <li>Îmbinăm valori sănătoase, moderne și tradiții de suflet.</li>
          <li>Construim apartenență, înțelegere și comunitate.</li>
        </ul>
      </main>
    </>
  );
}
