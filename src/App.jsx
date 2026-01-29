import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Talents from "./pages/Talent";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import SignIn from "./pages/SignIn.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<Layout />}>
        <Route path="/talents" element={<Talents />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>

    </Routes>
  );
}

export default App;