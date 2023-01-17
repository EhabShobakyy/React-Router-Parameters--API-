import "./App.css";
import OrganizationalStructure from "./Organizational Structure/Organizational Structure";
import OverviewPage from "./OverviewPage/OverviewPage";
import Header from "./Header/Header";
import PersonalDetails from "../src/PersonDetails/PersonalDetals";
// Import Routes
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route
            path="/organization"
            exact
            element={<OrganizationalStructure />}
          />
          <Route
            path="/organization/:individualID"
            exact
            element={<PersonalDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
