import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div className="row">
      <div className="col">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              <Link to="/" className="nav-item nav-link">
                Quote
              </Link>
              <Link to="claim" className="nav-item nav-link">
                Claim
              </Link>
              <Link to="about" className="nav-item nav-link">
                About
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
