import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Story from "./pages/Story.jsx";
import Mission from "./pages/Mission.jsx";
import Activities from "./pages/Activities.jsx";
import Resources from "./pages/Resources.jsx";
import Community from "./pages/Community.jsx";
import Contact from "./pages/Contact.jsx";

// 👉 New imports for the blog
import BlogIndex from "./components/BlogIndex.jsx";
import BlogPost from "./components/BlogPost.jsx";

export default function App() {
  return (
    <>
      {/* Analytics should be at the top level */}
      <Analytics />

      <BrowserRouter>
        <Nav brand="littleloop.ro" />

        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/poveste" element={<Story />} />
            <Route path="/misiune" element={<Mission />} />
            <Route path="/activitati" element={<Activities />} />
            <Route path="/resurse" element={<Resources />} />
            <Route path="/comunitate" element={<Community />} />
            <Route path="/contact" element={<Contact />} />

            {/* 👉 Blog routes */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  );
}
