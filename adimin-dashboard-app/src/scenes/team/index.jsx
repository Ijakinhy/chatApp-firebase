import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../component/Header";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
const Team = () => {
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
    {
      field: "age",
      Name: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "phone", Name: "Phone Number", flex: 1 },
    {
      field: "email",
      Name: "Email Address",
      flex: 1,
      cellClassName: "cell--class--name",
    },
    {
      field: "access",
      Name: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            bgcolor={
              access === "admin"
                ? colors.greenAccent[500]
                : colors.greenAccent[700]
            }
            display="flex"
            justifyContent="center"
            width="60%"
            p="5px"
            m="0 auto"
            borderRadius="5px"
          >
            {access === "admin" && <AdminPanelSettingsOutlined />}
            {access === "user" && <LockOpenOutlined />}
            {access === "manager" && <SecurityOutlined />}
            <Typography color={colors.grey[100]} ml="5px">
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="TEAM" subTitle="Managing Your Team Members" />
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
        }}
      >
        <DataGrid columns={columns} rows={mockDataTeam} />
      </Box>
    </Box>
  );
};

export default Team;
