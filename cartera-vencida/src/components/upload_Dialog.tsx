import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getCarteraVencidaBodegas, getCarteraVencidaPuestos } from '../providers/options/files';
import { useAppContext } from '../AppContext';

interface BodegasDialogProps {
  open: boolean;
  onClose: () => void;
  titulo: string;
}

export default function UploadDialog({ open, onClose, titulo }: BodegasDialogProps) {
  const theme = useTheme();
  const { setNuevaData } = useAppContext();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'text/xml') {
        setSelectedFile(file);
        console.log('Archivo seleccionado:', file);
      } else {
        alert('Por favor seleccione un archivo XML.');
      }
    }
  };

  const handleProcessClick = async () => {
    if (selectedFile) {
      let result;
      if (titulo === 'Bodegas') {
        result = await getCarteraVencidaBodegas(selectedFile);
      } else {
        result = await getCarteraVencidaPuestos(selectedFile);
      }
      if (result.success) {
        setNuevaData(titulo);
        console.log('Procesado con éxito:', result.data);
        setSnackbarMessage('Archivo procesado con éxito.');
        setSnackbarOpen(true);
        setSelectedFile(null);
        onClose();
      } else {
        console.error('Error al procesar:', result);
        setSnackbarMessage('Error al procesar el archivo.');
        setSnackbarOpen(true);
        onClose();
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog fullScreen={fullScreen} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title"
        PaperProps={{ sx: { borderRadius: '10px', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.2)', }, }} >
        <DialogTitle id="responsive-dialog-title" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {`Cargar Documento ${titulo}`}
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ textAlign: 'center', marginBottom: '20px' }}>
            Ingrese el documento a cargar
          </DialogContentText>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            {selectedFile ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ textAlign: 'center', marginRight: '10px' }}>
                  {selectedFile.name}
                </Typography>
                <Button variant="outlined" color="error" onClick={handleRemoveFile} sx={{ marginLeft: '10px' }} >
                  Eliminar
                </Button>
              </Box>
            ) : (
              <Button variant="outlined" component="span" onClick={handleUploadClick} sx={{ width: '50%' }} >
                Seleccionar Archivo
              </Button>
            )}
          </Box>

          <input type="file" accept=".xml" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Solo se aceptan archivos XML.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button onClick={handleProcessClick} variant="contained" color="primary" sx={{ width: '120px', margin: '0 10px' }} disabled={!selectedFile} >
              Procesar
            </Button>

            <Button onClick={onClose} variant="contained" color="error" sx={{ width: '120px', margin: '0 10px' }} >
              Cancelar
            </Button>
          </Box>
        </DialogActions>

      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} >
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes('Error') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
