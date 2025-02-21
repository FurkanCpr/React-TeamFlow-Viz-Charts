import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TeamForm from "./components/TeamForm";
import DiagramPage from "./pages/DiagramPage";
import ChartsPage from "./pages/ChartsPage";
import { TeamsProvider } from "./context/TeamsContext";

function App() {
  return (
    <TeamsProvider>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",  // Tüm ekranı kaplayacak şekilde ayarlar
            overflow: "hidden",  // Gereksiz scroll'u engeller
          }}
        >
          {/* Sabit Menü */}
          <nav
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: "20px",
              backgroundColor: "#5d1d88",
              paddingTop: "20px",
              paddingBottom: "20px",
              paddingRight: "40px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              Team Form
            </Link>
            <Link to="/diagram" style={{ color: "#fff", textDecoration: "none" }}>
              Diagram
            </Link>
            <Link to="/charts" style={{ color: "#fff", textDecoration: "none" }}>
              Charts
            </Link>
          </nav>

          {/* İçerik Alanı */}
          <main
            style={{
              width: "100%",
              flex: 1, // Kalan alanı kaplayarak içerik alanının esnek olmasını sağlar
              padding: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ maxWidth: "1200px", width: "100%" }}>
              <Routes>
                <Route path="/" element={<TeamForm />} />
                <Route path="/diagram" element={<DiagramPage />} />
                <Route path="/charts" element={<ChartsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </TeamsProvider>
  );
}

export default App;
