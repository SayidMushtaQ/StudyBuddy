import "./App.css";
import AppRouters from "./routers/AppRouters.route";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar.component";
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <AppRouters />
      </Router>
    </>
  );
}

export default App;
