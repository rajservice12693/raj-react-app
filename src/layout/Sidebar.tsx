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
  Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link, useLocation } from "react-router-dom";

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
          background: "linear-gradient(180deg, #2c2c2c 0%, #1a1a1a 100%)",
          border: "none",
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Toolbar 
        sx={{ 
          background: "#ffebce",
          color: "#000",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          minHeight: "70px !important",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DiamondIcon sx={{ fontSize: 28 }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: "bold",
              fontSize: "1.2rem"
            }}
          >
            R@J Admin
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose}
          sx={{
            color: "#000",
            background: "rgba(255, 255, 255, 0.2)",
            '&:hover': {
              background: "rgba(255, 255, 255, 0.3)",
            }
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

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
                  borderRadius: "8px",
                  margin: "4px 8px",
                  padding: "12px 16px",
                  transition: "all 0.3s ease",
                  border: isActive ? "2px solid #C0C0C0" : "2px solid transparent",
                  background: isActive 
                    ? "linear-gradient(135deg, rgba(192, 192, 192, 0.2) 0%, rgba(229, 228, 226, 0.1) 100%)"
                    : "transparent",
                  color: isActive ? "#E5E4E2" : "#e0e0e0",
                  
                  "&:hover": {
                    background: "linear-gradient(135deg, rgba(192, 192, 192, 0.3) 0%, rgba(229, 228, 226, 0.2) 100%)",
                    color: "#E5E4E2",
                    transform: "translateX(4px)",
                    border: "2px solid rgba(192, 192, 192, 0.5)",
                  },
                  
                  "&.Mui-selected": {
                    background: "linear-gradient(135deg, rgba(192, 192, 192, 0.3) 0%, rgba(229, 228, 226, 0.2) 100%)",
                    color: "#E5E4E2",
                  },
                  
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "#E5E4E2" : "#b0b0b0",
                    minWidth: "40px",
                  },
                  
                  "&:hover .MuiListItemIcon-root": {
                    color: "#E5E4E2",
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
      <Box sx={{ padding: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <ListItemButton
          component={Link}
          to="/admin/dashboard/settings"
          sx={{
            borderRadius: "8px",
            padding: "12px 16px",
            color: "#b0b0b0",
            transition: "all 0.3s ease",
            
            "&:hover": {
              color: "#E5E4E2",
              background: "rgba(192, 192, 192, 0.1)",
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