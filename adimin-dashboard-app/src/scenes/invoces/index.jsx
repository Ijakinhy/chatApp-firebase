import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../component/Header";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataInvoices } from "../../data/mockData";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },

    {
      field: "name",
      Name: "Name",
      flex: 1,
      cellClassName: "cell--class--name",
    },
    { field: "phone", Name: "Phone Number", flex: 1 },
    {
      field: "email",
      Name: "Email Address",
      flex: 1,
    },
    {
      field: "cost",
      Name: "Cost",
      flex: 1,
      renderCell: ({ row: { cost } }) => {
        return (
          <Box>
            <Typography m="15px auto" color={colors.greenAccent[300]}>
              ${cost}
            </Typography>
          </Box>
        );
      },
    },
    { field: "date", Name: "Date", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subTitle="List of Invoice Balances" />
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

          "& .PrivateSwitchBase-input": {
            color: colors.grey[100],
          },
        }}
      >
        <DataGrid
          columns={columns}
          rows={mockDataInvoices}
          slots={{ toolbar: GridToolbar }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Invoices;
