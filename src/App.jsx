import React from "react";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Story from "./pages/Story.jsx";
import Mission from "./pages/Mission.jsx";
import Activities from "./pages/Activities.jsx";
import Resources from "./pages/Resources.jsx";
import Community from "./pages/Community.jsx";
import Contact from "./pages/Contact.jsx";
import { useRouter } from "./lib/router.jsx";

const routes = [
  { path: "/", el: <Home /> },
  { path: "/poveste", el: <Story /> },
  { path: "/misiune", el: <Mission /> },
  { path: "/activitati", el: <Activities /> },
  { path: "/resurse", el: <Resources /> },
  { path: "/comunitate", el: <Community /> },
  { path: "/contact", el: <Contact /> },
];

export default function App() {
  const { path } = useRouter();
  const match = routes.find((route) => route.path === path) || routes[0];

  return (
    <div>
      <Nav brand="littleloop.ro" />
      {match.el}
      <Footer />
    </div>
  );
}
