import { NavLink } from "react-router-dom";
// Style
import "./Header.css";
function Header() {
  return (
    <>
      <div className="nav container-md d-flex justify-content-center m-3 ">
        <NavLink className="nav-link" to="/" end>
          OverviewPage
        </NavLink>
        <NavLink className="nav-link" to="/organization">
          organization
        </NavLink>
      </div>
    </>
  );
}
export default Header;
