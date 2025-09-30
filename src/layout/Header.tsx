// src/components/Layout/HeaderGuest.tsx
import React, { useState } from "react";
import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../components/common/Logo";

interface HeaderGuestProps {
  onLoginClick: () => void;
}

const HeaderGuest: React.FC<HeaderGuestProps> = ({ onLoginClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Earrings");

  const menuItems = ["Earrings", "Rings", "Daily Wear", "Collections", "Wedding", "Gifting"];

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%)",
        color: "#5d4037",
        boxShadow: "0 4px 20px rgba(255, 193, 7, 0.2)",
        width: '100%',
        margin: 0,
        padding: 0,
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 193, 7, 0.3)",
      }}
    >
      {/* Top notification bar */}
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
        minHeight: "60px !important",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        '@media (max-width: 768px)': {
          padding: "0 15px",
          minHeight: "50px !important"
        }
      }}>
        {/* Left section - Brand and categories */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "30px",
          '@media (max-width: 1024px)': {
            gap: "20px"
          },
          '@media (max-width: 768px)': {
            gap: "10px"
          }
        }}>
          {/* Brand */}
          <Logo 
            size="medium" 
            variant="header" 
            subtitle="All Jewellery & Gold"
          />

          {/* Diamond section */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "5px",
            '@media (max-width: 768px)': {
              display: 'none'
            }
          }}>
            <Box component="span" sx={{ fontSize: "18px" }}>💎</Box>
            <Box component="span" sx={{ fontSize: "14px" }}>Diamond</Box>
          </Box>

          {/* Desktop Navigation items */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "15px",
            '@media (max-width: 900px)': {
              display: 'none'
            }
          }}>
            {menuItems.map((item) => (
              <Button 
                key={item}
                className={activeMenu === item ? "active-menu" : ""}
                sx={{ 
                  color: "#5d4037", 
                  fontSize: "14px", 
                  textTransform: "none",
                  minWidth: "auto",
                  padding: "8px 16px",
                  fontWeight: activeMenu === item ? "bold" : "500",
                  position: "relative",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  background: activeMenu === item ? "rgba(255, 193, 7, 0.2)" : "transparent",
                  backdropFilter: "blur(10px)",
                  '&:hover': {
                    backgroundColor: "rgba(255, 193, 7, 0.15)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 15px rgba(255, 193, 7, 0.2)",
                  },
                  '&.active-menu': {
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                    boxShadow: "0 2px 10px rgba(255, 193, 7, 0.3)",
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '-2px',
                      left: '16px',
                      right: '16px',
                      height: '2px',
                      backgroundColor: '#ffc107',
                      borderRadius: '1px'
                    }
                  }
                }}
                onClick={() => setActiveMenu(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Right section - More and Login buttons */}
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "15px",
          '@media (max-width: 100px)': {
            gap: "10px"
          }
        }}>
          {/* <Button
            sx={{
              color: "#5d4037",
              fontSize: "14px",
              textTransform: "none",
              fontWeight: "500",
              padding: "8px 16px",
              borderRadius: "20px",
              transition: "all 0.3s ease",
              background: "rgba(255, 193, 7, 0.1)",
              backdropFilter: "blur(10px)",
              '&:hover': {
                backgroundColor: "rgba(255, 193, 7, 0.2)",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 15px rgba(255, 193, 7, 0.2)",
              },
              '@media (max-width: 900px)': {
                display: 'none'
              }
            }}
          >
            More
          </Button> */}
          
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
              color: "#5d4037",
              textTransform: "none",
              borderRadius: "25px",
              padding: "10px 24px",
              fontSize: "14px",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(255, 193, 7, 0.3)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              '&:hover': {
                background: "linear-gradient(135deg, #ffb300 0%, #ff6f00 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(255, 193, 7, 0.4)",
              },
              '&::before': {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                transition: "left 0.5s",
              },
              '&:hover::before': {
                left: "100%",
              },
              '@media (max-width: 480px)': {
                padding: "8px 18px",
                fontSize: "12px"
              }
            }}
            onClick={onLoginClick}
          >
            ✨ LOGIN
          </Button>

          {/* Mobile menu button */}
          <IconButton
            sx={{
              display: 'none',
              color: '#000',
              '@media (max-width: 900px)': {
                display: 'block'
              }
            }}
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#ffebce',
          zIndex: 9999,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          padding: '20px',
          display: 'none',
          '@media (max-width: 900px)': {
            display: 'block'
          }
        }}
      >
        {/* Close button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <IconButton onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon sx={{ color: '#000', fontSize: '28px' }} />
          </IconButton>
        </Box>

        {/* Mobile menu items */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Brand in mobile */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box component="span" sx={{ 
              fontWeight: "bold", 
              fontSize: "24px",
              display: 'block'
            }}>
              R@J
            </Box>
            <Box component="span" sx={{ fontSize: "14px" }}>
              All Jewellery & Gold
            </Box>
          </Box>

          {/* Diamond section in mobile */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px",
            justifyContent: 'center',
            mb: 3
          }}>
            <Box component="span" sx={{ fontSize: "24px" }}>💎</Box>
            <Box component="span" sx={{ fontSize: "18px", fontWeight: 'bold' }}>Diamond</Box>
          </Box>

          {menuItems.map((item) => (
            <Button 
              key={item}
              fullWidth
              className={activeMenu === item ? "active-menu" : ""}
              sx={{ 
                color: activeMenu === item ? "#000" : "#333", 
                fontSize: "16px", 
                textTransform: "none",
                padding: "12px 20px",
                fontWeight: activeMenu === item ? "bold" : "normal",
                justifyContent: 'flex-start',
                borderRadius: "8px",
                transition: "all 0.3s ease",
                marginBottom: '5px',
                '&:hover': {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  transform: "translateX(5px)"
                },
                '&.active-menu': {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderLeft: '4px solid #000'
                }
              }}
              onClick={() => {
                setActiveMenu(item);
                setMobileMenuOpen(false);
              }}
            >
              {item}
            </Button>
          ))}

          {/* More button in mobile */}
          <Button
            fullWidth
            sx={{
              color: "#000",
              fontSize: "16px",
              textTransform: "none",
              fontWeight: "bold",
              padding: "12px 20px",
              borderRadius: "8px",
              justifyContent: 'flex-start',
              transition: "all 0.3s ease",
              marginTop: '10px',
              '&:hover': {
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                transform: "translateX(5px)"
              }
            }}
          >
            More
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
};

export default HeaderGuest;