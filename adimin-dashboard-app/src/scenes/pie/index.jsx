import { Box } from "@mui/material";
import PieChart from "../../component/PieChart";
import Header from "../../component/Header";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subTitle="Simple Pie Chart" />

      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
