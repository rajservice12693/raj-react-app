import { Card, CardContent, Typography, Box, Chip, Button, IconButton } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ItemCard = ({ item }: { item: any }) => {
  return (
    <Card
      sx={{
        height: "100%",
        maxHeight: "480px",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        background: "linear-gradient(145deg, #ffffff 0%, #fefefe 50%, #f8f9fa 100%)",
        border: "1px solid rgba(255, 193, 7, 0.1)",
        borderRadius: "20px",
        boxShadow: "0 3px 15px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 15px 35px rgba(255, 193, 7, 0.15), 0 5px 20px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 193, 7, 0.3)",
          "& .jewelry-image": {
            transform: "scale(1.03)",
            "&::after": {
              opacity: 1,
            }
          },
          "& .action-buttons": {
            opacity: 1,
            transform: "translateY(0)",
          },
          "& .card-content": {
            transform: "translateY(-1px)",
          }
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #ffc107 0%, #ff8f00 50%, #ffc107 100%)",
          opacity: 0.8
        }
      }}
    >
      {/* Image Placeholder */}
      <Box
        className="jewelry-image"
        sx={{
          height: "180px",
          background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 30%, #ffe0b2 70%, #fff3e0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.4s ease",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 30% 20%, rgba(255, 193, 7, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 143, 0, 0.08) 0%, transparent 50%)",
            opacity: 0.6
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"elegant-sparkles\" width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\"><circle cx=\"20\" cy=\"20\" r=\"0.8\" fill=\"%23ffc107\" opacity=\"0.3\"/><circle cx=\"5\" cy=\"5\" r=\"0.4\" fill=\"%23ff8f00\" opacity=\"0.4\"/><circle cx=\"35\" cy=\"10\" r=\"0.6\" fill=\"%23ffc107\" opacity=\"0.2\"/><circle cx=\"10\" cy=\"35\" r=\"0.5\" fill=\"%23ff8f00\" opacity=\"0.3\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23elegant-sparkles)\"/></svg>')",
            opacity: 0,
            transition: "opacity 0.5s ease"
          }
        }}
      >
        <Box sx={{ 
          position: "relative",
          zIndex: 2,
          "& .diamond-icon": {
            color: "#ffc107",
            fontSize: "2.8rem",
            filter: "drop-shadow(0 3px 6px rgba(255, 193, 7, 0.3)) drop-shadow(0 0 15px rgba(255, 193, 7, 0.2))",
            animation: "sparkle 3s ease-in-out infinite alternate",
            transition: "all 0.3s ease"
          }
        }}>
          <DiamondIcon className="diamond-icon" />
        </Box>
        
        {/* Action Buttons */}
        {/* <Box
          className="action-buttons"
          sx={{
            position: "absolute",
            top: "16px",
            right: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            opacity: 0,
            transform: "translateY(-15px)",
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          }}
        > */}
          {/* <IconButton
            size="small"
            sx={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(15px)",
              color: "#e91e63",
              borderRadius: "12px",
              width: "36px",
              height: "36px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              "&:hover": {
                background: "rgba(233, 30, 99, 0.1)",
                transform: "scale(1.1) rotate(5deg)",
                boxShadow: "0 6px 20px rgba(233, 30, 99, 0.2)"
              }
            }}
          >
            <FavoriteBorderIcon fontSize="small" />
          </IconButton> */}
          {/* <IconButton
            size="small"
            sx={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(15px)",
              color: "#ffc107",
              borderRadius: "12px",
              width: "36px",
              height: "36px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              "&:hover": {
                background: "rgba(255, 193, 7, 0.1)",
                transform: "scale(1.1) rotate(-5deg)",
                boxShadow: "0 6px 20px rgba(255, 193, 7, 0.2)"
              }
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton> */}
        {/* </Box> */}
      </Box>

      <CardContent className="card-content" sx={{ 
        flexGrow: 1, 
        p: 2.5,
        transition: "transform 0.3s ease"
      }}>
        {/* Title */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: "600",
            fontSize: "1.1rem",
            color: "#3e2723",
            mb: 1,
            lineHeight: 1.3,
            letterSpacing: "0.02em"
          }}
        >
          {item.materialName} {item.categoryName}
        </Typography>
        
        {/* Description */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: "#8d6e63",
            mb: 1.5,
            fontSize: "0.8rem",
            lineHeight: 1.4,
            fontStyle: "italic",
            opacity: 0.8
          }}
        >
          Exquisite {item.materialName.toLowerCase()} {item.categoryName.toLowerCase()} crafted with precision
        </Typography>
        
        {/* Details */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 1.5, 
          mb: 2,
          p: 1.5,
          background: "linear-gradient(135deg, rgba(255, 193, 7, 0.03) 0%, rgba(255, 143, 0, 0.02) 100%)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 193, 7, 0.1)"
        }}>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            py: 0.5
          }}>
            <Typography variant="body2" sx={{ 
              color: "#8d6e63", 
              fontSize: "0.8rem",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              Purity
            </Typography>
            <Chip 
              label={item.purity} 
              size="small" 
              sx={{ 
                background: "linear-gradient(135deg, #ffc107, #ff8f00)",
                color: "#5d4037",
                fontWeight: "bold",
                fontSize: "0.75rem",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(255, 193, 7, 0.2)"
              }}
            />
          </Box>
          
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            py: 0.5
          }}>
            <Typography variant="body2" sx={{ 
              color: "#8d6e63", 
              fontSize: "0.8rem",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              Weight
            </Typography>
            <Typography variant="body2" sx={{ 
              fontWeight: "600", 
              color: "#3e2723",
              fontSize: "0.9rem"
            }}>
              {item.weight}g
            </Typography>
          </Box>
        </Box>
        
        {/* Price and Add to Cart */}
        {/* <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          pt: 1,
          borderTop: "1px solid rgba(255, 193, 7, 0.1)"
        }}>
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: "700",
                background: "linear-gradient(135deg, #ffc107, #ff8f00)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.2rem",
                letterSpacing: "0.02em"
              }}
            >
              ₹{item.price}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: "#8d6e63",
                fontSize: "0.7rem",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
            >
              Starting Price
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCartIcon />}
            sx={{
              background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
              color: "#5d4037",
              borderRadius: "12px",
              px: 2,
              py: 0.8,
              fontSize: "0.75rem",
              fontWeight: "600",
              textTransform: "none",
              boxShadow: "0 3px 12px rgba(255, 193, 7, 0.3)",
              transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              border: "1px solid rgba(255, 193, 7, 0.2)",
              "&:hover": {
                background: "linear-gradient(135deg, #ffb300 0%, #ff6f00 100%)",
                transform: "translateY(-1px) scale(1.02)",
                boxShadow: "0 6px 20px rgba(255, 193, 7, 0.4)",
                border: "1px solid rgba(255, 193, 7, 0.3)",
              },
              "&:active": {
                transform: "translateY(-1px) scale(1.01)",
              }
            }}
          >
            Add to Cart
          </Button>
        </Box> */}
      </CardContent>
    </Card>
  );
};

export default ItemCard;
