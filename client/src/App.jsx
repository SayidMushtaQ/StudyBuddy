import LandingPage from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from './pages/student'
import DashboardLayout from './layouts/Dashboard'
import Notes from "./pages/student/notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student" element={<DashboardLayout/>}>
          <Route index element={<Student />} />
          <Route path="/student/notes" element={<Notes />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
