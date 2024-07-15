import React from 'react';
import './Footer.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta
import logoEpema from '../resources/images/logoEpema-Photoroom.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <img
          alt="EP-EMA Logo"
          src={logoEpema}
          width={200}
          height={200}
        />
      </div>
      <div className="footer-center">
        <h4>El centro de acopio más grande el Ecuador</h4>
        <p>Distribuimos productos agrícolas que cumplen los estándares de calidad, al por mayor a precios de competencia.</p>
        <hr />
        <p>EP-EMA © {new Date().getFullYear()}. Todos los derechos reservados.</p>
      </div>
      <div className="footer-social">
        {/* Aquí podrías agregar iconos sociales si es necesario */}
      </div>
    </footer>
  );
};

export default Footer;
