import React from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Paper,
  Chip,
  Avatar,
  LinearProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  Build as BuildIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Star as StarIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as CartIcon,
  Assessment as AssessmentIcon
} from "@mui/icons-material";

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const dashboardCards = [
    {
      title: "Jewellery Management",
      description: "Manage jewellery items, add new pieces, and update existing ones",
      icon: <InventoryIcon sx={{ fontSize: 40, color: "#ffc107" }} />,
      path: "/admin/dashboard/jewelleryEntry",
      color: "#fff8e1"
    },
    {
      title: "Category Management",
      description: "Organize jewellery by categories and manage category hierarchy",
      icon: <CategoryIcon sx={{ fontSize: 40, color: "#ff9800" }} />,
      path: "/admin/dashboard/categoryEntry",
      color: "#fff3e0"
    },
    {
      title: "Material Management",
      description: "Manage materials used in jewellery production and pricing",
      icon: <BuildIcon sx={{ fontSize: 40, color: "#4caf50" }} />,
      path: "/admin/dashboard/materialEntry",
      color: "#e8f5e8"
    }
  ];

  const statsCards = [
    { 
      title: "Total Items", 
      value: "124", 
      icon: <InventoryIcon />, 
      color: "#2196f3",
      gradient: "linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)",
      bgColor: "#e3f2fd",
      change: "+12%",
      changeType: "positive"
    },
    { 
      title: "Categories", 
      value: "8", 
      icon: <CategoryIcon />, 
      color: "#ff9800",
      gradient: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
      bgColor: "#fff3e0",
      change: "+2",
      changeType: "positive"
    },
    { 
      title: "Materials", 
      value: "15", 
      icon: <BuildIcon />, 
      color: "#4caf50",
      gradient: "linear-gradient(135deg, #4caf50 0%, #81c784 100%)",
      bgColor: "#e8f5e8",
      change: "+5",
      changeType: "positive"
    },
    { 
      title: "Active Users", 
      value: "24", 
      icon: <PeopleIcon />, 
      color: "#9c27b0",
      gradient: "linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)",
      bgColor: "#f3e5f5",
      change: "+8%",
      changeType: "positive"
    }
  ];

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 }, 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 20% 80%, rgba(255, 193, 7, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(33, 150, 243, 0.1) 0%, transparent 50%)",
        pointerEvents: "none"
      }
    }}>
      {/* Welcome Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          mb: 4, 
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 193, 7, 0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #ffc107, #ff8f00, #ffb300, #ffc107)",
            backgroundSize: "300% 100%",
            animation: "gradientShift 3s ease infinite"
          },
          "@keyframes gradientShift": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" }
          }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar sx={{ 
            background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
            width: 56,
            height: 56,
            boxShadow: "0 4px 20px rgba(255, 193, 7, 0.4)"
          }}>
            <DashboardIcon sx={{ fontSize: 32, color: "#fff" }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: "bold", 
              color: "#2c3e50",
              background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Admin Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: "#7f8c8d", fontWeight: 500 }}>
              Jewelry Management System
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" sx={{ color: "#2c3e50", mb: 1, fontWeight: 600 }}>
          Welcome back, <Box component="span" sx={{ 
            background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold"
          }}>{user}</Box>! 👋
        </Typography>
        <Typography variant="body1" sx={{ color: "#7f8c8d", lineHeight: 1.6 }}>
          Manage your jewellery inventory, categories, and materials from this central dashboard. 
          Track performance and make data-driven decisions.
        </Typography>
      </Paper>

      {/* Enhanced Stats Cards */}
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        gap: 3, 
        mb: 4 
      }}>
        {statsCards.map((stat, index) => (
          <Card 
            key={index}
            sx={{ 
              height: "100%",
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              borderRadius: "20px",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-8px) scale(1.02)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                "& .stat-icon": {
                  transform: "scale(1.1) rotate(5deg)"
                }
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: stat.gradient
              }
            }}
          >
            <CardContent sx={{ p: 3, position: "relative" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Avatar 
                  className="stat-icon"
                  sx={{ 
                    background: stat.gradient,
                    width: 56,
                    height: 56,
                    boxShadow: `0 8px 20px ${stat.color}40`,
                    transition: "all 0.3s ease"
                  }}
                >
                  {React.cloneElement(stat.icon, { 
                    sx: { fontSize: 28, color: "#fff" } 
                  })}
                </Avatar>
                <Chip
                  label={stat.change}
                  size="small"
                  sx={{
                    background: stat.changeType === "positive" ? "#e8f5e8" : "#ffebee",
                    color: stat.changeType === "positive" ? "#2e7d32" : "#c62828",
                    fontWeight: "bold",
                    fontSize: "0.75rem"
                  }}
                />
              </Box>
              
              <Typography variant="h3" sx={{ 
                fontWeight: "bold", 
                background: stat.gradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
                lineHeight: 1
              }}>
                {stat.value}
              </Typography>
              
              <Typography variant="h6" sx={{ 
                color: "#2c3e50", 
                fontWeight: 600,
                mb: 2
              }}>
                {stat.title}
              </Typography>
              
              <LinearProgress 
                variant="determinate" 
                value={75} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: `${stat.color}20`,
                  "& .MuiLinearProgress-bar": {
                    background: stat.gradient,
                    borderRadius: 3
                  }
                }} 
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Management Tools Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: "bold", 
          mb: 3, 
          color: "#2c3e50",
          display: "flex",
          alignItems: "center",
          gap: 1
        }}>
          <StarIcon sx={{ color: "#ffc107", fontSize: 32 }} />
          Management Tools
        </Typography>
        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3 
        }}>
          {dashboardCards.map((card, index) => (
            <Card 
              key={index}
              sx={{ 
                height: "100%",
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  "& .card-icon": {
                    transform: "scale(1.1) rotate(5deg)"
                  },
                  "& .card-button": {
                    background: "linear-gradient(135deg, #ff8f00 0%, #ff6f00 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 30px rgba(255, 143, 0, 0.4)"
                  }
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #ffc107, #ff8f00, #ffb300, #ffc107)",
                  backgroundSize: "300% 100%",
                  animation: "gradientShift 3s ease infinite"
                }
              }}
            >
              <CardContent sx={{ p: 3, position: "relative" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar 
                    className="card-icon"
                    sx={{ 
                      background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                      width: 48,
                      height: 48,
                      mr: 2,
                      boxShadow: "0 4px 15px rgba(255, 193, 7, 0.3)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {React.cloneElement(card.icon, { 
                      sx: { fontSize: 24, color: "#fff" } 
                    })}
                  </Avatar>
                  <Typography variant="h6" sx={{ 
                    fontWeight: "bold", 
                    color: "#2c3e50",
                    flex: 1
                  }}>
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ 
                  color: "#7f8c8d", 
                  mb: 3,
                  lineHeight: 1.6
                }}>
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  className="card-button"
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(card.path)}
                  sx={{
                    background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "15px",
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 4px 15px rgba(255, 193, 7, 0.3)",
                    transition: "all 0.3s ease"
                  }}
                >
                  Manage {card.title.split(' ')[0]}
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Enhanced Quick Actions */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          mt: 4, 
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #2196f3, #21cbf3, #03a9f4, #2196f3)",
            backgroundSize: "300% 100%",
            animation: "gradientShift 3s ease infinite"
          }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar sx={{ 
            background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
            width: 48,
            height: 48,
            mr: 2,
            boxShadow: "0 4px 15px rgba(33, 150, 243, 0.3)"
          }}>
            <AssessmentIcon sx={{ fontSize: 24, color: "#fff" }} />
          </Avatar>
          <Typography variant="h5" sx={{ 
            fontWeight: "bold", 
            color: "#2c3e50",
            background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Quick Actions
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ 
          color: "#7f8c8d", 
          mb: 3,
          lineHeight: 1.6
        }}>
          Access frequently used features and tools to streamline your workflow.
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Chip 
            icon={<TrendingUpIcon />} 
            label="View Analytics" 
            clickable 
            sx={{ 
              background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.9rem",
              py: 2,
              px: 1,
              height: "auto",
              "&:hover": {
                background: "linear-gradient(135deg, #388e3c 0%, #4caf50 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(76, 175, 80, 0.4)"
              },
              transition: "all 0.3s ease"
            }}
          />
          <Chip 
            icon={<MoneyIcon />} 
            label="Export Data" 
            clickable 
            sx={{ 
              background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.9rem",
              py: 2,
              px: 1,
              height: "auto",
              "&:hover": {
                background: "linear-gradient(135deg, #f57c00 0%, #ff9800 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(255, 152, 0, 0.4)"
              },
              transition: "all 0.3s ease"
            }}
          />
          <Chip 
            icon={<PeopleIcon />} 
            label="User Management" 
            clickable 
            sx={{ 
              background: "linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.9rem",
              py: 2,
              px: 1,
              height: "auto",
              "&:hover": {
                background: "linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(156, 39, 176, 0.4)"
              },
              transition: "all 0.3s ease"
            }}
          />
          <Chip 
            icon={<CartIcon />} 
            label="Order Management" 
            clickable 
            sx={{ 
              background: "linear-gradient(135deg, #e91e63 0%, #f06292 100%)",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.9rem",
              py: 2,
              px: 1,
              height: "auto",
              "&:hover": {
                background: "linear-gradient(135deg, #c2185b 0%, #e91e63 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(233, 30, 99, 0.4)"
              },
              transition: "all 0.3s ease"
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};
