import LandingPage from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from './pages/student'
import DashboardLayout from './layouts/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student" element={<DashboardLayout/>}>
          <Route index element={<Student />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
