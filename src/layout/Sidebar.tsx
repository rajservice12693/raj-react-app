import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DiamondIcon from "@mui/icons-material/Diamond";
import CategoryIcon from "@mui/icons-material/Category";
import LayersIcon from "@mui/icons-material/Layers";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/common/Logo";

interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const drawerWidth = 280;

const menuItems: MenuItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  {
    label: "Jewellery Entry",
    path: "/admin/dashboard/jewelleryEntry",
    icon: <DiamondIcon />,
  },
  {
    label: "Category Entry",
    path: "/admin/dashboard/categoryEntry",
    icon: <CategoryIcon />,
  },
  {
    label: "Material Entry",
    path: "/admin/dashboard/materialEntry",
    icon: <LayersIcon />,
  },
  {
    label: "Inventory",
    path: "/admin/dashboard/inventory",
    icon: <InventoryIcon />,
  },
  {
    label: "Customers",
    path: "/admin/dashboard/customers",
    icon: <PeopleIcon />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const location = useLocation();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #fff8e1 0%, #ffecb3 100%)",
          border: "none",
          boxShadow: "4px 0 20px rgba(255, 193, 7, 0.3)",
          borderRight: "2px solid rgba(255, 193, 7, 0.2)",
          top: "140px", // Position below the header
          height: "calc(100vh - 140px)", // Adjust height to account for header
        },
      }}
    >
      <Toolbar 
        sx={{ 
          background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
          color: "#5d4037",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          minHeight: "70px !important",
          boxShadow: "0 2px 10px rgba(255, 193, 7, 0.3)",
        }}
      >
        <Logo 
          size="small" 
          variant="sidebar" 
          subtitle="Rohit Alankar Jewellers"
        />
        <IconButton 
          onClick={onClose}
          sx={{
            color: "#5d4037",
            background: "rgba(93, 64, 55, 0.1)",
            '&:hover': {
              background: "rgba(93, 64, 55, 0.2)",
            }
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255, 193, 7, 0.3)" }} />

      {/* Navigation Menu */}
      <Box sx={{ overflow: "auto", flex: 1, py: 2 }}>
        <List sx={{ padding: "0 8px" }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.path}
                component={Link}
                to={item.path}
                onClick={onClose}
                selected={isActive}
                sx={{
                  borderRadius: "12px",
                  margin: "4px 8px",
                  padding: "12px 16px",
                  transition: "all 0.3s ease",
                  border: isActive ? "2px solid #ffc107" : "2px solid transparent",
                  background: isActive 
                    ? "linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 152, 0, 0.1) 100%)"
                    : "transparent",
                  color: isActive ? "#5d4037" : "#8d6e63",
                  
                  "&:hover": {
                    background: "linear-gradient(135deg, rgba(255, 193, 7, 0.3) 0%, rgba(255, 152, 0, 0.2) 100%)",
                    color: "#5d4037",
                    transform: "translateX(4px)",
                    border: "2px solid rgba(255, 193, 7, 0.5)",
                    boxShadow: "0 4px 15px rgba(255, 193, 7, 0.2)",
                  },
                  
                  "&.Mui-selected": {
                    background: "linear-gradient(135deg, rgba(255, 193, 7, 0.3) 0%, rgba(255, 152, 0, 0.2) 100%)",
                    color: "#5d4037",
                    boxShadow: "0 4px 15px rgba(255, 193, 7, 0.2)",
                  },
                  
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "#ffc107" : "#8d6e63",
                    minWidth: "40px",
                  },
                  
                  "&:hover .MuiListItemIcon-root": {
                    color: "#ffc107",
                  },
                }}
              >
                <ListItemIcon sx={{ fontSize: "22px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{
                    fontSize: "15px",
                    fontWeight: isActive ? "600" : "500",
                    letterSpacing: "0.3px",
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* Footer Section */}
      <Box sx={{ padding: "16px", borderTop: "1px solid rgba(255, 193, 7, 0.3)" }}>
        <ListItemButton
          component={Link}
          to="/admin/dashboard/settings"
          sx={{
            borderRadius: "12px",
            padding: "12px 16px",
            color: "#8d6e63",
            transition: "all 0.3s ease",
            
            "&:hover": {
              color: "#5d4037",
              background: "linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 152, 0, 0.1) 100%)",
              transform: "translateX(4px)",
              boxShadow: "0 4px 15px rgba(255, 193, 7, 0.2)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: "40px" }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Settings" 
            primaryTypographyProps={{
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;