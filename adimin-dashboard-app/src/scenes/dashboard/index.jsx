import React from "react";
import Header from "../../component/Header";
import { Box, Typography, Button, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../component/LineChart";
import GeographyChart from "../../component/GeographyChart";
import BarChart from "../../component/BarChart";
import {
  DownloadOutlined,
  EmailOutlined,
  PersonAddOutlined,
  PointOfSaleOutlined,
  TrafficOutlined,
} from "@mui/icons-material";
import StatBox from "../../component/StatBox";
import { mockTransactions } from "../../data/mockData";
import ProgressCircle from "../../component/ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m={"20px"}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title={"DASHBOARD"} subTitle={"Welcome To Your Dashboard"} />
        <Box>
          <Button
            sx={{
              bgcolor: colors.blueAccent[700],
              p: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              color: colors.grey[100],
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Report
          </Button>
        </Box>
      </Box>
      {/* grid and charts  */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* row one  */}

        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,351"
            subTitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subTitle="Sales Obtained"
            progress="0.5"
            increase="+21%"
            icon={
              <PointOfSaleOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subTitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subTitle="Treaffic Inbound"
            progress="0.80"
            increase="+45%"
            icon={
              <TrafficOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Row 2 */}

        <Box gridColumn="span 8" gridRow="span 2" bgcolor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold  "
                color={colors.greenAccent[500]}
              >
                $58,283,434
              </Typography>
            </Box>
            <Box>
              <IconButton
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              >
                <DownloadOutlined />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        {/* transactions */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
            color={colors.grey[100]}
          >
            <Typography variant="h5" fontWeight="500" color={colors.grey[100]}>
              Recent Transactions
            </Typography>
          </Box>

          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.greenAccent[500]}
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                bgcolor={colors.greenAccent[500]}
                padding="5px 10px"
                borderRadius="4px"
              >
                {transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
        {/* Row  3 */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            mt="25px"
            alignItems="center"
          >
            <ProgressCircle size="125" />
            <Typography
              color={colors.greenAccent[500]}
              variant="h5"
              sx={{ mt: "15px" }}
            >
              $43,945 revenue genereted
            </Typography>
            <Typography>Includes extra misc expenditures and cost</Typography>
          </Box>
        </Box>
        {/* row 3 */}
        <Box gridColumn="span 4" gridRow="span 2" bgcolor={colors.primary[400]}>
          <Typography
            variant="h5"
            sx={{ p: "30px 30px 0 30px " }}
            fontWeight="600"
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2 "
          bgcolor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" sx={{ mb: "15px" }} fontWeight="600">
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
