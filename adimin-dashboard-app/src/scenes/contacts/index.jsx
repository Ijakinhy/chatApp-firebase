import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../component/Header";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID", flex: 0.5 },
    {
      field: "name",
      Name: "Name",
      flex: 1,
      cellClassName: "cell--class--name",
    },
    {
      field: "email",
      Name: "Email Address",
      flex: 1,
      cellClassName: "cell--class--name",
    },
    {
      field: "age",
      Name: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "phone", Name: "Phone Number", flex: 0.5 },
    { field: "address", Name: "address", flex: 1 },
    { field: "city", Name: "City", flex: 0.5 },
    { field: "zipCode", Name: "Zip Code " },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subTitle="List of Contacts for Future Reference"
      />
      <Box
        height="74vh"
        display="flex"
        justifyContent="center"
        m="40px 0 20px 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none !important",
          },
          "& .cell--class--name": {
            color: colors.greenAccent[400],
          },
          "& .MuiDataGrid-columnHeader ": {
            bgcolor: colors.blueAccent[700],
            borderBottom: "none !important",
          },
          "& .MuiDataGrid-virtualScroller": {
            bgcolor: colors.primary[400],
          },
          "& .MuiDataGrid-cell": {
            border: "none !important",
          },
          "& .MuiDataGrid-footerContainer": {
            bgcolor: colors.blueAccent[700],
            borderTop: "none !important",
          },
          "& .MuiButtonBase-root": {
            color: colors.grey[100],
          },
        }}
      >
        <DataGrid
          columns={columns}
          rows={mockDataContacts}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
