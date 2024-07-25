import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import colors from "../resources/style/colors";
import {
  getAllContribuyentes,
  addContribuyente,
  updateContribuyente,
  deleteContribuyente,
} from "../providers/options/contributors";

const columnsContribuyentes: GridColDef[] = [
  { field: "ciu", headerName: "CIU", flex: 1 },
  { field: "cedula", headerName: "Cédula", flex: 1 },
  { field: "nombre", headerName: "Contribuyente", flex: 1 },
  { field: "estado", headerName: "Estado", flex: 1 },
];

const Body_Usuario: React.FC = () => {
  const [ciu, setCiu] = useState("");
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [rows, setRows] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    fetchContribuyentes();
  }, []);

  const fetchContribuyentes = async () => {
    const result = await getAllContribuyentes();
    if (result.success) {
      setRows(result.contribuyentes);
    }
  };

  const handleCreate = async () => {
    if (!ciu || !cedula || !nombre) {
      alert("Todos los campos deben ser llenados");
      return;
    }

    const result = await addContribuyente({ ciu, cedula, nombre, estado });
    if (result.success) {
      setMessage("Contribuyente creado exitosamente");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      fetchContribuyentes();
    } else {
      setMessage("Error al crear el contribuyente");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleEdit = async () => {
    if (!selectedRow || !ciu || !cedula || !nombre) {
      alert("Seleccione una fila y complete todos los campos");
      return;
    }

    const result = await updateContribuyente(ciu, { cedula, nombre, estado });
    if (result.success) {
      setMessage("Contribuyente actualizado exitosamente");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      fetchContribuyentes();
    } else {
      setMessage("Error al actualizar el contribuyente");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDelete = async () => {
    if (!selectedRow) {
      alert("Seleccione una fila para eliminar");
      return;
    }

    if (
      window.confirm(
        "¿Estás seguro de eliminar este contribuyente permanentemente de la base de datos?"
      )
    ) {
      const result = await deleteContribuyente(selectedRow.ciu);
      if (result.success) {
        setMessage("Contribuyente eliminado exitosamente");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        fetchContribuyentes();
      } else {
        setMessage("Error al eliminar el contribuyente");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRow(params.row);
    setCiu(params.row.ciu);
    setCedula(params.row.cedula);
    setNombre(params.row.nombre);
    setEstado(params.row.estado);
  };

  const handleChange = (event: SelectChangeEvent<any>) => {
    setEstado(event.target.value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    const searchTermLowercase = searchTerm.toLowerCase();
    return (
      row.ciu.toString().includes(searchTermLowercase) ||
      row.cedula.toString().includes(searchTermLowercase) ||
      row.nombre.toLowerCase().includes(searchTermLowercase)
    );
  });

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h4" gutterBottom>
              Contribuyentes
            </Typography>
            <Box sx={{ flexGrow: 1, ml: { xs: 0, sm: 2, md: 17 } }}>
              <TextField
                label="Buscar"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1">CIU:</Typography>
              <TextField value={ciu} onChange={(e) => setCiu(e.target.value)} fullWidth />
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1">Cédula:</Typography>
              <TextField value={cedula} onChange={(e) => setCedula(e.target.value)} fullWidth />
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body1">Contribuyente:</Typography>
              <TextField value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth multiline rows={3} />
            </Box>
            <FormControl fullWidth>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select labelId="estado-label" value={estado} onChange={handleChange}>
                <MenuItem value={"Activo"}>Activo</MenuItem>
                <MenuItem value={"Inactivo"}>Inactivo</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  onClick={handleCreate}
                  fullWidth
                  sx={{
                    bgcolor: colors.oliveGreen,
                    "&:hover": { bgcolor: colors.oliveGreenGradient },
                  }}
                >
                  Crear
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  fullWidth
                  sx={{ bgcolor: colors.blue, "&:hover": { bgcolor: colors.blueGradient } }}
                >
                  Actualizar
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  onClick={handleDelete}
                  fullWidth
                  sx={{
                    bgcolor: colors.orangeSalmon,
                    "&:hover": { bgcolor: colors.orangeSalmonGradient },
                  }}
                >
                  Eliminar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Box>
            <DataGrid
              rows={filteredRows}
              columns={columnsContribuyentes}
              getRowId={(row) => row.ciu}
              onRowClick={handleRowClick}
              sx={{
                width: "100%",
                height: 550,
                "& .MuiDataGrid-columnHeaderTitleContainer": { backgroundColor: colors.background_WhiteSmokeBlack },
                "& .MuiDataGrid-columnHeader": { backgroundColor: colors.background_WhiteSmokeBlack },
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {message && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Body_Usuario;
