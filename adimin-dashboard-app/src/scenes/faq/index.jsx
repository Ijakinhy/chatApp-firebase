import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../data/component/Header";
import { ExpandMore } from "@mui/icons-material";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FAQ" subTitle="Frequently Asked Questions Page" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5" color={colors.greenAccent[500]}>
            {" "}
            An Important Question{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus fugit dolore facere labore est laboriosam, odio sapiente
            delectus eius tempore.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5" color={colors.greenAccent[500]}>
            {" "}
            One of the Best Question Asked.{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus fugit dolore facere labore est laboriosam, odio sapiente
            delectus eius tempore.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5" color={colors.greenAccent[500]}>
            {" "}
            Your Favorite Question{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus fugit dolore facere labore est laboriosam, odio sapiente
            delectus eius tempore.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5" color={colors.greenAccent[500]}>
            {" "}
            Some Random Question{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus fugit dolore facere labore est laboriosam, odio sapiente
            delectus eius tempore.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5" color={colors.greenAccent[500]}>
            {" "}
            The Final Question{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus fugit dolore facere labore est laboriosam, odio sapiente
            delectus eius tempore.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
