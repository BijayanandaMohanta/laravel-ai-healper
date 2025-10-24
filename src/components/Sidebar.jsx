import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="d-flex flex-column text-white bg-dark"
      style={{ height: "100vh", position: "relative" }}
    >
      {/* Header */}
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none p-3"
      >
        <span className="fs-4">Laravel AI Helper</span>
      </a>
      <hr className="text-white m-0" />

      {/* Scrollable Navigation */}
      <div style={{ overflowY: "auto", flex: 1 }}>
        <ul className="nav nav-pills flex-column mb-auto py-3 px-3">
          <li className="nav-item mb-3">
            <Link to="/artisan-generator" className="nav-link text-white">
              <i className="bi bi-terminal me-2"></i> Artisan Generator
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/crud-generator" className="nav-link text-white">
              <i className="bi bi-hammer me-2"></i> CRUD Generator
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/syntax-check" className="nav-link text-white">
              <i class="bi bi-spellcheck me-2"></i> Syntax Check
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/encryption" className="nav-link text-white">
              <i class="bi bi-shield-lock me-2"></i> Password Encryption
            </Link>
          </li>
          {/* Add more links here */}
        </ul>
      </div>

      {/* Sticky Profile Section */}
      <div className="position-relative">
        <hr className="text-white m-0" />
        <div
          className="d-flex p-3 align-items-center w-100"
          style={{ cursor: "pointer" }}
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            src="https://avatar.iran.liara.run/public/50"
            alt="Profile"
            width="40"
            height="40"
            className="rounded-circle me-2"
          />
          <strong>Developer</strong>
        </div>

        {/* Custom Popover Menu */}
        {showMenu && (
          <div
            className="position-absolute bg-dark shadow rounded mt-2 mx-1"
            style={{
              width: "97%",
              bottom: "4rem",
              left: 0,
              zIndex: 1000,
              border: "1px solid #444",
            }}
          >
            <ul className="list-unstyled m-0">
              <li>
                <Link
                  to="/portfolio"
                  className="d-block px-3 py-2 text-white text-decoration-none hover-bg"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="d-block px-3 py-2 text-white text-decoration-none hover-bg"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
