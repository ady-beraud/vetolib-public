import "./App.css";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import Appointments from "./routes/Appointments/Appointments";
import Profile from "./routes/Profile/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./routes/Search/Search";
import Professional from "./routes/Professional/Professional";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/login" exact Component={Login} />
        <Route path="/register" exact Component={Register} />
        <Route path="/account/appointments" exact Component={Appointments} />
        <Route path="/account/profile" exact Component={Profile} />
        <Route path="/search" exact Component={Search} />
        <Route path="/professional" exact Component={Professional} />
      </Routes>
    </Router>
  );
}

export default App;
