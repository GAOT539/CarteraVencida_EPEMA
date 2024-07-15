import React from 'react';
import '../styles/Footer.css';
import logoEpema from '../resources/images/logoFill.png';

const Bar_Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img
          alt="EP-EMA Logo"
          src={logoEpema}
        />
      </div>
      <div className="footer-center">
        <h4>El centro de acopio más grande el Ecuador</h4>
        <p>Distribuimos productos agrícolas que cumplen los estándares de calidad, al por mayor a precios de competencia.</p>
        <hr />
        <p>EP-EMA © {new Date().getFullYear()}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Bar_Footer;
