import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

interface BodegasDialogProps {
  open: boolean;
  onClose: () => void;
  titulo: string;
}

export default function UploadDialog({ open, onClose, titulo }: BodegasDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "text/xml") {
        // Aquí puedes manejar el archivo XML
        console.log("Archivo seleccionado:", file);
      } else {
        alert("Por favor seleccione un archivo XML.");
      }
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {`Cargar Documento ${titulo}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingrese el documento a cargar
        </DialogContentText>
        <input
          type="file"
          accept=".xml"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </DialogContent>
      <DialogActions>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 16px' }}>
          <Button 
            onClick={onClose} 
            variant="contained" 
            color='error' 
            sx={{ width: '120px' }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleUploadClick} 
            variant="contained" 
            color="primary" 
            sx={{ width: '120px' }}
          >
            Cargar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
