import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  TextField,
  Button,
  Container,
  Grid,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import colors from "../resources/style/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  getHistoricosBodegasNoPagado,
  getHistoricosBodegasNuevos,
  getHistoricosPuestosNoPagado,
  getHistoricosPuestosNuevos,
} from "../providers/options/historical";
import UploadDialog from "./upload_Dialog";
import { useAppContext } from "../AppContext";
import { CloudDownload } from "@mui/icons-material";

import GeneradorPDF from "./generator_PDF";

const columnsHistoricos: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "numero_reporte", headerName: "Número de Reporte", flex: 1 },
  { field: "ciu", headerName: "CIU", flex: 1 },
  { field: "contribuyente.nombre", headerName: "Nombre", flex: 1 },
  { field: "contribuyente.cedula", headerName: "Cedula", flex: 1 },
  { field: "ubicacion", headerName: "Ubicación", flex: 2 },
  { field: "fecha", headerName: "Fecha", flex: 1 },
  { field: "meses", headerName: "Meses", flex: 1 },
  {
    field: "cantNotificaciones",
    headerName: "Cantidad de Notificaciones",
    flex: 1,
  },
  { field: "archivo", headerName: "Archivo", flex: 1 },
  { field: "valor", headerName: "Valor", flex: 1 },
  { field: "pagado", headerName: "Pagado", flex: 1 },
];

export default function DataTable() {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { setOpcion_Titulo, opcion_Titulo, setSelectedRow, nuevaData } =
    useAppContext();
  const [carga, setCarga] = useState("");

  useEffect(() => {
    fetchBodegas();
    setOpcion_Titulo("Bodegas");
  }, []);

  useEffect(() => {
    if (nuevaData == "Bodegas") {
      fetchBodegasNuevos();
    } else {
      fetchPuestosNuevos();
    }
  }, [nuevaData]);

  const fetchBodegasNuevos = async () => {
    try {
      const result = await getHistoricosBodegasNuevos();
      if (result.success) {
        const transformedData = transformData(
          result.historicosWithContribuyentes
        );
        setRows(transformedData);
        filterData(searchText, transformedData);
      }
    } catch (error) {
      console.error("Error fetching bodegas:", error);
    }
  };

  const fetchPuestosNuevos = async () => {
    try {
      const result = await getHistoricosPuestosNuevos();
      if (result.success) {
        const transformedData = transformData(
          result.historicosWithContribuyentes
        );
        setRows(transformedData);
        filterData(searchText, transformedData);
      }
    } catch (error) {
      console.error("Error fetching bodegas:", error);
    }
  };
  const fetchBodegas = async () => {
    try {
      const result = await getHistoricosBodegasNoPagado();
      if (result.success) {
        const transformedData = transformData(result.historicosList);
        setRows(transformedData);
        filterData(searchText, transformedData);
      }
    } catch (error) {
      console.error("Error fetching bodegas:", error);
    }
  };

  const fetchPuestos = async () => {
    try {
      const result = await getHistoricosPuestosNoPagado();
      if (result.success) {
        const transformedData = transformData(result.historicosList);
        setRows(transformedData);
        filterData(searchText, transformedData);
      }
    } catch (error) {
      console.error("Error fetching puestos:", error);
    }
  };

  const transformData = (data: any[]) => {
    return data.map((row) => ({
      ...row,
      ubicacion: `${row.bodega || ""} ${row.puesto || ""} ${row.nave || ""} ${
        row.seccion || ""
      }`.trim(),
    }));
  };

  const filterData = (search: string, data: any[]) => {
    let filtered = data;
    if (search) {
      filtered = filtered.filter(
        (row) =>
          row.numero_reporte
            ?.toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          row.ciu?.toLowerCase().includes(search.toLowerCase()) ||
          row.cantNotificaciones
            ?.toString()
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }
    setFilteredRows(filtered);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    filterData(value, rows);
  };

  const handleLoadData = () => {
    setDialogOpen(true);
  };

  const handleNotifyAll = () => {
    console.log("Notificar a todos");
  };

  const handleDownloadPDFs = () => {
    console.log("Descargar PDFs");
  };

  const handleChangeBodegas = () => {
    setOpcion_Titulo("Bodegas");
    fetchBodegas();
  };

  const handleChangePuestos = () => {
    setOpcion_Titulo("Puestos");
    fetchPuestos();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleRowClick = (params: any) => {
    const selectedRow = {
      ...params.row,
      seccion: params.row.ubicacion.split(" ").pop() || "",
    };
    setSelectedRow(selectedRow);
  };

  return (
    <Container maxWidth="lg" style={{ padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.oliveGreen,
                "&:hover": { backgroundColor: colors.oliveGreenGradient },
              }}
              onClick={handleChangeBodegas}
            >
              Bodegas
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.oliveGreen,
                "&:hover": { backgroundColor: colors.oliveGreenGradient },
              }}
              onClick={handleChangePuestos}
            >
              Puestos
            </Button>
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: colors.blue,
                "&:hover": { backgroundColor: colors.blueGradient },
              }}
              onClick={handleLoadData}
              disabled={!opcion_Titulo}
            >
              Cargar datos
            </Button>
            <Button
              variant="contained"
              startIcon={<CloudDownload />}
              sx={{
                backgroundColor: colors.orangeSalmon,
                "&:hover": { backgroundColor: colors.orangeSalmonGradient },
              }}
              onClick={handleDownloadPDFs}
              disabled={!opcion_Titulo}
            >
              Descargar PDFs
            </Button>
          </Box>
          <UploadDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            titulo={opcion_Titulo}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Buscar"
            variant="outlined"
            value={searchText}
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
        </Grid>
        <Grid item xs={12}>
          <Box style={{ width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columnsHistoricos}
              columnVisibilityModel={{
                id: false,
                "contribuyente.nombre": false,
                "contribuyente.cedula": false,
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 11 },
                },
              }}
              pageSizeOptions={[5, 10]}
              onRowClick={handleRowClick}
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: colors.oliveGreen,
                "& .MuiDataGrid-cell:hover": {
                  color: colors.orangeSalmon,
                },
                "& .MuiDataGrid-columnHeaderTitleContainer": {
                  backgroundColor: colors.background_WhiteSmokeBlack,
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: colors.background_WhiteSmokeBlack,
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
