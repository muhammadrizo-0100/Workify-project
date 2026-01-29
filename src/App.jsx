import "./App.css";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Talents from "./pages/Talent";
import Jobs from "./pages/Jobs";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashbord.jsx";

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />
    //   <Route path="/" element={} />

    //   <Route element={<Layout />}>
    //     <Route path="/talents" element={<Talents />} />
    //     <Route path="/jobs" element={<Jobs />} />
    //   </Route>
    //   {/* <Route path="/signin" element={<SignIn />} /> */}
    //   {/* <Route path="/signup" element={<SignUp />} /> */}
    // </Routes>
    <Dashboard />
  );
}

export default App;