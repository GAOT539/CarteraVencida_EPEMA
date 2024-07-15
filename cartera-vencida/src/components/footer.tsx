import React from 'react';
import './Footer.css'; // Asegúrate de crear y estilizar este archivo CSS o usar un objeto de estilos en línea.

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <img 
        src="https://ambato-ema.gob.ec/wp-content/uploads/2023/03/epema-1.jpg" 
        alt="Icono EP-EMA" 
        className="footer-icon" 
      />
      <span className="footer-text">EP-EMA © {new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
