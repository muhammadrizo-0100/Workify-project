import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Talents from "./pages/Talent";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<Layout />}>
        <Route path="/talents" element={<Talents />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;