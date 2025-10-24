import { Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="btn btn-dark d-md-none position-fixed top-0 start-0 m-2 z-3"
        onClick={() => setShowSidebar(!showSidebar)}
        style={{ zIndex: 1050 }}
      >
        <i className="bi bi-list fs-4"></i>
      </button>

      {/* Sidebar */}
      <div
        className={`bg-dark text-white d-flex flex-column position-fixed top-0 ${
          showSidebar ? "start-0" : "start-n100"
        } h-100 transition-all`}
        style={{
          width: "250px",
          zIndex: 1040,
          transition: "left 0.3s ease-in-out",
        }}
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
                <i className="bi bi-spellcheck me-2"></i> Syntax Check
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/encryption" className="nav-link text-white">
                <i className="bi bi-shield-lock me-2"></i> Password Encryption
              </Link>
            </li>
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
    </>
  );
};

export default Sidebar;
