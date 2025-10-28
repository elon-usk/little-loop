import { useEffect, useState } from 'react'
export default function App() {
  const [subscribeOpen, setSubscribeOpen] = useState(true)

  useEffect(() => {
    // Reveal-on-scroll
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    reveals.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = document.getElementById('map')
    // Ensure Leaflet is available and map container exists
    if (!el || !window.L) return
    if (el.dataset.mapInitialized) return
    el.dataset.mapInitialized = 'true'

    const map = window.L.map('map').setView([44.4268, 26.1025], 13)
    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    window.L.marker([44.4268, 26.1025])
      .addTo(map)
      .bindPopup('A pretty CSS popup.<br/>Easily customizable.')
      .openPopup()
  }, [])

  return (
    <>
      <header className="site-header">
        <div className="logo">littleloop<span className="tld">.ro</span></div>
        <nav>
          <a href="#poveste" data-text="Povestea">Povestea</a>
          <a href="#misiune" data-text="Misiunea">Misiunea</a>
          <a href="#activitati" data-text="Activități">Activități</a>
          <a href="#resurse" data-text="Resurse">Resurse</a>
          <a href="#comunitate" data-text="Comunitatea">Comunitatea</a>
        </nav>
        <a href="#contact" className="contact-edge">Contact</a>
      </header>

      <section id="hero" className="fullscreen">
        <h1>Redescoperă bucuria de a fi părinte</h1>
        <p>Pentru cei ce aleg să-și transforme călătoria în familie într-o experiență valoroasă, creativă și inspirată.</p>
        <a href="#comunitate" className="cta-button">Alătură-te comunității</a>
      </section>

      <section id="despre" className="wide">
        <h2>Despre Little Loop</h2>
        <p>
          Little Loop s-a născut din dorința de a fi alături de părinți — în special mame — oferind ghiduri de activități, recomandări, sfaturi practice,
          review-uri de produse, idei de sustenabilitate și sprijin real pentru afacerile locale.
        </p>
        <ul>
          <li>Redescoperim bucuria de a fi părinte.</li>
          <li>Transformăm provocările într-o ocazie de creștere și amintiri memorabile.</li>
          <li>Combinația dintre valori moderne, sănătoase și tradiții de suflet pentru fiecare familie.</li>
          <li>Sprijin real pentru părinți ce pot simți izolare sau lipsă de conexiune — aici găsești apartenență, înțelegere și comunitate.</li>
          <li>Încurajăm gândirea critică, dialogul deschis și susținem businessuri din comunitate cu impact pozitiv.</li>
        </ul>
      </section>

      <section id="activitati">
        <div className="activitati-text">
        <h2>Activități pentru părinți și copii</h2>
        <p>Idei, inspirație și materiale pentru joacă, creativitate și conectare:</p>
        <ul>
          <li>Ateliere de creație — pictură, colaje, lucru manual</li>
          <li>Jocuri educative pentru dezvoltare emoțională</li>
          <li>Ghiduri pentru ieșiri în natură, excursii în familie</li>
          <li>Momente de mindfulness și respirație pentru întreaga familie</li>
          <li>Provocări lunare cu tematică adaptată sezonului</li>
        </ul>
        </div>
        <div id="map" aria-label="Harta Little Loop" />
      </section>

      <section id="resurse">
        <h2>Resurse utile</h2>
        <p>Review-uri de produse, recomandări sustenabile, idei pentru sprijin local:</p>
        <ul>
          <li>Review-uri de jucării, cărți, mobilier, produse sustenabile</li>
          <li>Lista businessurilor locale recomandate de părinți</li>
          <li>Articole „how‑to” pentru parenting modern și implicat</li>
          <li>Ghiduri pentru o viață de familie sustenabilă și sănătoasă</li>
        </ul>
      </section>

      <section id="comunitate">
        <h2>Comunitatea Little Loop</h2>
        <p>
          Creăm legături, susținem, inspirăm. Alătură-te evenimentelor noastre, workshopurilor, întâlnirilor și grupurilor dedicate părinților ca tine!
        </p>
        <ul>
          <li>Evenimente locale — ateliere, picnicuri, petreceri tematice</li>
          <li>Grupuri de sprijin și discuții online/în persoană</li>
          <li>Newsletter cu inspirație și noutăți</li>
          <li>Testimoniale, povești reale și resurse create împreună</li>
        </ul>
        <a href="#contact" className="cta-button">Vreau să cunosc comunitatea</a>
      </section>

      <section className="fullscreen reveal fade-up">
        <h2>Hărți interactive</h2>
        <p>Explorează activități după locație, vârstă și vreme potrivită.</p>
        <div id="map" aria-label="Hartă Little Loop" />
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Nume" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Mesajul tău..." required />
          <button type="submit">Trimite</button>
        </form>
        <p>Email: contact@littleloop.ro</p>
      </section>

      <section id="gandire-critica">
        <h2>Gândire critică &amp; alegeri informate</h2>
        <p>
          La Little Loop, credem în puterea întrebărilor, a schimbului de idei și a alegerilor bazate pe argumente reale, nu pe trenduri.
        </p>
        <ul>
          <li>Articole și ghiduri care invită părinții să analizeze informațiile, să pună întrebări și să caute surse de încredere.</li>
          <li>Comunitatea este un spațiu deschis pentru discuții și opinii diverse — susținem cu respect dezbaterea și schimbul de experiențe.</li>
          <li>Organizăm ateliere (online/offline) despre evaluarea surselor, decizii responsabile sau educație media pentru întreaga familie.</li>
          <li>Invităm specialiști (psihologi, pedagogi, experți în parenting) să clarifice mituri și să răspundă la dilemele părinților.</li>
          <li>Propunem activități pentru copii care stimulează întrebările, experimentarea și abordarea creativă a problemelor.</li>
        </ul>
        <p>
          Astfel, Little Loop devine partenerul tău nu doar pentru sprijin, ci și pentru formarea unei mentalități deschise, analitice și responsabile în familie.
        </p>
      </section>

      <footer className="site-footer">
        &copy; 2025 Little Loop. Toate drepturile rezervate.
      </footer>

      {subscribeOpen && (
        <div className="subscribe-popup" id="subscribe-popup">
          <button className="close-popup" onClick={() => setSubscribeOpen(false)}>&times;</button>
          <h2>Alătură-te misiunii noastre — pentru că fiecare început contează.</h2>
          <p>Abonează-te pentru noutăți, actualizări și resurse utile.</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email" required />
            <button type="submit">Mă abonez</button>
          </form>
          <small>Prin abonare, îți exprimi acordul ca datele tale să fie folosite în scopul trimiterii newsletterului Little Loop.</small>
        </div>
      )}
    </>
  )
}
