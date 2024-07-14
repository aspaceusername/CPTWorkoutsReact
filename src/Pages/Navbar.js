// src/Pages/Navbar.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [navDemoVisible, setNavDemoVisible] = useState(false);

  const handleNavDemoClick = () => {
    setNavDemoVisible(!navDemoVisible);
  };

  return (
    <div>
      <div className="w3-top w3-text-white w3-black">
        <div className="w3-bar">
          <a
            className="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right"
            href="javascript:void(0)"
            title="Toggle Navigation Menu"
            onClick={handleNavDemoClick}
          >
            <i className="fa fa-bars"></i>
          </a>
          <Link to="/" className="w3-bar-item w3-button w3-padding-large">
            CPT
          </Link>
          {user && user.role === 'CLIENTE' ? (
            <>
              {/* Only show home link */}
              <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-hide-small">
                Home
              </Link>
            </>
          ) : (
            <>
              {/* Show other links */}
              <Link
                to="/clientes"
                className="w3-bar-item w3-button w3-padding-large w3-hide-small"
              >
                CLIENTES
              </Link>
              <Link
                to="/utilizadores"
                className="w3-bar-item w3-button w3-padding-large w3-hide-small"
              >
                UTILIZADORES
              </Link>
              <Link
                to="/equipas"
                className="w3-bar-item w3-button w3-padding-large w3-hide-small"
              >
                EQUIPAS
              </Link>
              <Link
                to="/servicos"
                className="w3-bar-item w3-button w3-padding-large w3-hide-small"
              >
                SERVICOS
              </Link>
              <Link
                to="/treinadores"
                className="w3-bar-item w3-button w3-padding-large w3-hide-small"
              >
                TREINADORES
              </Link>
              <Link
                to="/compras"
                className="w3-bar-item w3-button w3-padding-large w3-hide-small"
              >
                COMPRAS
              </Link>
            </>
          )}
          {user ? (
            <>
              <span className="w3-bar-item w3-button w3-padding-large w3-hide-small">
                {user.email}
              </span>
              <button
                className="w3-bar-item w3-button w3-padding-large w3-hide-small"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="w3-bar-item w3-button w3-padding-large w3-hide-small"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                className="w3-bar-item w3-button w3-padding-large w3-hide-small"
              >
                REGISTAR
              </Link>
            </>
          )}
        </div>
      </div>

      <div
        id="navDemo"
        className={`w3-bar-block w3-black ${
          navDemoVisible ? 'w3-show' : 'w3-hide'
        } w3-hide-large w3-hide-medium w3-top`}
        style={{ marginTop: '46px' }}
      >
        <a href="#about" className="w3-bar-item w3-button w3-padding-large">
          SOBRE
        </a>
        <a href="#service" className="w3-bar-item w3-button w3-padding-large">
          SERVIÇOS
        </a>
        <a
          href="#testimony"
          className="w3-bar-item w3-button w3-padding-large"
        >
          TESTEMUNHOS
        </a>
        <a href="#contact" className="w3-bar-item w3-button w3-padding-large">
          INFORMAÇÕES
        </a>
        <Link
          to="/clientes"
          className="w3-bar-item w3-button w3-padding-large w3-hide-small"
        >
          CLIENTES
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
