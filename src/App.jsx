import './App.css'
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Talents from './pages/Talent';
import Jobs from './pages/Jobs';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <Routes>
        <Route path="/" element="*" />
          <Route path="/talents" element={<Talents />} />
          <Route path="/jobs" element={<Jobs />} />

          {/* kelajakda qo'shish mumkin bo'lgan sahifalar */}
          {/* <Route path="/signin" element={<SignIn />} /> */}
          {/* <Route path="/signup" element={<SignUp />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>

      {/* <Footer /> */}
    </div>
  );
      <Footer />
    </>
  )
}

export default App;