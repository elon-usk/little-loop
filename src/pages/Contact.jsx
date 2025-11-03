import React from "react";

export default function Contact() {
  return (
    <main id="main" className="section container">
      <h2>Contact</h2>
      <div className="contact">
        <div>
          <p>Email: contact@exemplu.ro</p>
          <p>Telefon: +40 21 000 0000</p>
          <p>
            Social: <a className="link" href="#">Instagram</a> · <a className="link" href="#">Facebook</a>
          </p>
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()} aria-label="Formular de contact">
          <label>
            <span>Nume</span>
            <input type="text" placeholder="Numele tău" required />
          </label>
          <label>
            <span>Email</span>
            <input type="email" placeholder="adresa@exemplu.ro" required />
          </label>
          <label>
            <span>Mesaj</span>
            <textarea rows="4" placeholder="Scrie mesajul aici" required />
          </label>
          <button className="cta" type="submit">Trimite</button>
        </form>
      </div>
    </main>
  );
}
