import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [navDemoVisible, setNavDemoVisible] = useState(false);
  const [isCliente, setIsCliente] = useState(false);

  useEffect(() => {
    if (user && user.role === 'Cliente') {
      setIsCliente(true);
    } else {
      setIsCliente(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log('User role:', user.role);
    }
  }, [user]);

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
            onClick={() => {}}
          >
            <i className="fa fa-bars"></i>
          </a>
          <Link to="/" className="w3-bar-item w3-button w3-padding-large">
            CPT
          </Link>
          <Link to="/sobre" className="w3-bar-item w3-button w3-padding-large">Sobre</Link>
          {user && user.role === 'Cliente' ? (

            <>
              <span className="w3-bar-item w3-button w3-padding-large w3-hide-small">{user.email}</span>
              <button className="w3-bar-item w3-button w3-padding-large w3-hide-small" onClick={logout}>
                Logout
              </button>
            </>
          ) : user ? (
            <>
              <Link to="/clientes" className="w3-bar-item w3-button w3-padding-large w3-hide-small">
                CLIENTES
              </Link>
              <Link to="/utilizadores" className="w3-bar-item w3-button w3-padding-large w3-hide-small">
                UTILIZADORES
              </Link>
              <Link to="/equipas" className="w3-bar-item w3-button w3-padding-large w3-hide-small">
                EQUIPAS
              </Link>
              <Link to="/servicos" className="w3-bar-item w3-button w3-padding-large w3-hide-small">
                SERVICOS
              </Link>
              <Link to="/treinadores" className="w3-bar-item w3-button w3-padding-large w3-hide-small">
                TREINADORES
              </Link>
              <Link to="/compras" className="w3-bar-item w3-button w3-padding-large w3-hide-small">
                COMPRAS
              </Link>
              <span className="w3-bar-item w3-button w3-padding-large w3-hide-small">{user.email}</span>
              <button className="w3-bar-item w3-button w3-padding-large w3-hide-small" onClick={logout}>
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="w3-bar-item w3-button w3-padding-large w3-hide-small">
                LOGIN
              </Link>
              <Link to="/register" className="w3-bar-item w3-button w3-padding-large w3-hide-small">
                REGISTAR
              </Link>
            </>
          )}
        </div>
      </div>
      
      <div id="navDemo" className="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top">
        <Link to="/" className="w3-bar-item w3-button w3-padding-large">
          CPT
        </Link>
        {user && user.role === 'Cliente' ? (
          <>
            <Link to="/" className="w3-bar-item w3-button w3-padding-large">
              Home
            </Link>
            <span className="w3-bar-item w3-button w3-padding-large">{user.email}</span>
            <button className="w3-bar-item w3-button w3-padding-large" onClick={logout}>
              Logout
            </button>
          </>
        ) : user ? (
          <>
            <Link to="/clientes" className="w3-bar-item w3-button w3-padding-large">
              CLIENTES
            </Link>
            <Link to="/utilizadores" className="w3-bar-item w3-button w3-padding-large">
              UTILIZADORES
            </Link>
            <Link to="/equipas" className="w3-bar-item w3-button w3-padding-large">
              EQUIPAS
            </Link>
            <Link to="/servicos" className="w3-bar-item w3-button w3-padding-large">
              SERVICOS
            </Link>
            <Link to="/treinadores" className="w3-bar-item w3-button w3-padding-large">
              TREINADORES
            </Link>
            <Link to="/compras" className="w3-bar-item w3-button w3-padding-large">
              COMPRAS
            </Link>
            <span className="w3-bar-item w3-button w3-padding-large">{user.email}</span>
            <button className="w3-bar-item w3-button w3-padding-large" onClick={logout}>
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="w3-bar-item w3-button w3-padding-large">
              LOGIN
            </Link>
            <Link to="/register" className="w3-bar-item w3-button w3-padding-large">
              REGISTAR
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
