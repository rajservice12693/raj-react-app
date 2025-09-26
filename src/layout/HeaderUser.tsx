// src/components/Layout/HeaderUser.tsx

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Chip } from "@mui/material";
import Logo from "../components/common/Logo";

interface HeaderUserProps {
  onMenuToggle?: () => void;
  onLogout?: () => void;
  userName?: string;
}

const HeaderUser: React.FC<HeaderUserProps> = ({
  onMenuToggle,
  onLogout,
  userName,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "#ffebce",
        color: "#000",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        borderBottom: "2px solid #000",
      }}
    >
      {/* Top Notification Bar */}
      {/* <Box sx={{ 
        background: "#000", 
        color: "#E5E4E2", 
        textAlign: "center", 
        py: 0.5,
        fontSize: "12px",
        fontWeight: "bold"
      }}>
        Pre-Book for Dussehra is Live Now!
      </Box> */}

      <Toolbar sx={{ 
        minHeight: "70px !important",
        padding: "0 20px !important",
      }}>
        {/* Menu Button & Brand */}
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuToggle}
            sx={{ 
              mr: 2,
              background: "rgba(0, 0, 0, 0.1)",
              '&:hover': {
                background: "rgba(0, 0, 0, 0.2)",
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
              padding: "8px",
            }}
          >
            <MenuIcon sx={{ fontSize: 28 }} />
          </IconButton>

          {/* Brand */}
          <Logo 
            size="large" 
            variant="admin" 
            subtitle="Rohit Alankar Jewellers"
          />
        </Box>

        {/* User info + Logout button */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 2,
          background: "rgba(255, 255, 255, 0.2)",
          padding: "8px 16px",
          borderRadius: "25px",
          border: "1px solid rgba(0, 0, 0, 0.2)",
        }}>
          {/* User Chip */}
          <Chip
            icon={<AccountCircleIcon />}
            label={userName || "Admin"}
            variant="filled"
            sx={{
              background: "linear-gradient(135deg, #000 0%, #333 100%)",
              color: "#E5E4E2",
              fontWeight: "bold",
              '& .MuiChip-icon': {
                color: "#E5E4E2",
              },
              '&:hover': {
                background: "linear-gradient(135deg, #333 0%, #555 100%)",
              }
            }}
          />

          {/* Logout Button */}
          <IconButton 
            color="inherit" 
            onClick={onLogout} 
            aria-label="logout"
            sx={{
              background: "linear-gradient(135deg, #000 0%, #333 100%)",
              color: "#E5E4E2",
              padding: "8px",
              '&:hover': {
                background: "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
                transform: "scale(1.1)",
                color: "#fff",
              },
              transition: "all 0.3s ease",
              border: "2px solid #000",
            }}
          >
            <LogoutIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Quick Stats Bar */}
      <Box sx={{ 
        background: "rgba(0, 0, 0, 0.05)", 
        py: 1, 
        px: 2,
        display: "flex",
        justifyContent: "center",
        gap: 4,
        borderTop: "1px solid rgba(0, 0, 0, 0.1)"
      }}>
        <Typography variant="caption" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 0.5 }}>
          <DiamondIcon sx={{ fontSize: 14 }} /> Jewellery: 124
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 0.5 }}>
          💎 Categories: 8
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 0.5 }}>
          📦 Orders: 24
        </Typography>
      </Box>
    </AppBar>
  );
};

export default HeaderUser;