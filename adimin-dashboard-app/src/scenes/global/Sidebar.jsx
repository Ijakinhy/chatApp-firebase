import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import { Box, IconButton, Typography } from "@mui/material";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  ContactsOutlined,
  HelpOutline,
  HomeOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutline,
  PieChartOutlineOutlined,
  ReceiptOutlined,
  TimelineOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// item

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      active={selected === title}
      icon={icon}
    >
      <Typography>{title}</Typography>

      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSelected, setIsSelected] = useState("dashboard");
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          background: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* users  */}

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" alignItems="center" justifyContent=" center">
                <img
                  src={`../../../src/assets/img1.jpg`}
                  alt="user profile"
                  width="100px"
                  height="100px"
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                  color={colors.grey[100]}
                >
                  ijakins
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admins
                </Typography>
              </Box>
            </Box>
          )}
          {/* menu Item  */}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlined />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px " }}
            >
              Data
            </Typography>

            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleAltOutlined />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts   "
              icon={<ContactsOutlined />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlined />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px " }}
            >
              Pages
            </Typography>

            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutline />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlined />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutline />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px " }}
            >
              Charts
            </Typography>

            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlined />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlined />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlined />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlined />}
              selected={isSelected}
              setSelected={setIsSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
