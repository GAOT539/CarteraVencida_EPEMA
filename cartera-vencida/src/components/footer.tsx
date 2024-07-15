import React from 'react';
import './Footer.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <h4>Links de Interés</h4>
        <img 
        src="https://ambato-ema.gob.ec/wp-content/uploads/2023/03/epema-1.jpg" 
        alt="Icono EP-EMA" 
        className="footer-icon" 
      />
      </div>
      <div className="footer-center">
        <h4>El centro de acopio más grande el Ecuador</h4>
        <p>Distribuimos productos agrícolas que cumplen los estándares de calidad, al por mayor a precios de competencia.</p>
        <hr />
        <p>EP-EMA © {new Date().getFullYear()}. Todos los derechos reservados.</p>
      </div>
      <div className="footer-social">
        <img src="URL_ICONO_FACEBOOK" alt="Facebook" />
        <img src="URL_ICONO_TWITTER" alt="Twitter" />
        <img src="URL_ICONO_INSTAGRAM" alt="Instagram" />
      </div>
    </footer>
  );
};

export default Footer;
