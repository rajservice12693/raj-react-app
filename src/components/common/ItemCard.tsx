import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import { useState, useEffect } from "react";

const ItemCard = ({ item }: { item: any }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);


  // Auto-play on hover
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isHovered && item.images && item.images.length > 1) {
      console.log('Starting carousel auto-play for item:', item.itemName || item.materialName);
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const next = (prev + 1) % item.images.length;
          console.log('Auto-playing to image:', next);
          return next;
        });
      }, 1500); // Faster auto-play for better UX
    } else {
      console.log('Stopping carousel auto-play');
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHovered, item.images]);

  return (
    <Card
      onMouseEnter={() => {
        console.log('Mouse entered card:', item.itemName || item.materialName);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        console.log('Mouse left card:', item.itemName || item.materialName);
        setIsHovered(false);
      }}
      sx={{
        height: "100%",
        maxHeight: "380px",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        background: "linear-gradient(145deg, #ffffff 0%, #fefefe 50%, #f8f9fa 100%)",
        border: "1px solid rgba(255, 193, 7, 0.1)",
        borderRadius: "16px",
        boxShadow: "0 3px 15px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(20px)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 25px rgba(255, 193, 7, 0.15), 0 3px 15px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 193, 7, 0.3)",
          "& .jewelry-image": {
            transform: "scale(1.02)",
          },
          "& .carousel-arrows": {
            opacity: 1,
          },
          "& .carousel-indicators": {
            opacity: 1,
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
      {/* Jewelry Image Carousel */}
      <Box
        className="jewelry-image"
        sx={{
          height: "150px",
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
            background: item.images && item.images.length > 0 
              ? `url(${item.images[currentImageIndex]})` 
              : "linear-gradient(135deg, #fff8e1 0%, #ffecb3 30%, #ffe0b2 70%, #fff3e0 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            zIndex: 1
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: item.images && item.images.length > 0 
              ? "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)"
              : "radial-gradient(circle at 30% 20%, rgba(255, 193, 7, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 143, 0, 0.08) 0%, transparent 50%)",
            opacity: 0.6,
            zIndex: 2
          }
        }}
      >
        {/* Show diamond icon only if no images */}
        {(!item.images || item.images.length === 0) && (
          <Box sx={{ 
            position: "relative",
            zIndex: 3,
            "& .diamond-icon": {
              color: "#ffc107",
              fontSize: "2.2rem",
              filter: "drop-shadow(0 3px 6px rgba(255, 193, 7, 0.3)) drop-shadow(0 0 15px rgba(255, 193, 7, 0.2))",
              animation: "sparkle 3s ease-in-out infinite alternate",
              transition: "all 0.3s ease"
            }
          }}>
            <DiamondIcon className="diamond-icon" />
          </Box>
        )}

        {/* Auto-play indicator */}
        {isHovered && item.images && item.images.length > 1 && (
          <Box sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: 4,
            background: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            borderRadius: "12px",
            px: 1,
            py: 0.5,
            fontSize: "0.7rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 0.5
          }}>
            <Box sx={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#ffc107",
              animation: "pulse 1.5s ease-in-out infinite"
            }} />
            Auto
          </Box>
        )}
        
        
        {/* Image indicators */}
        {item.images && item.images.length > 1 && (
          <Box 
            className="carousel-indicators"
            sx={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 0.5,
              zIndex: 4,
              opacity: isHovered ? 1 : 0,
              transition: "all 0.3s ease"
            }}
          >
            {item.images.map((_: any, index: number) => (
              <Box
                key={index}
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: currentImageIndex === index ? "#ffc107" : "rgba(255, 255, 255, 0.6)",
                  border: currentImageIndex === index ? "2px solid #fff" : "1px solid rgba(255, 255, 255, 0.3)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: currentImageIndex === index ? "#ff8f00" : "rgba(255, 255, 255, 0.8)",
                    transform: "scale(1.2)"
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </Box>
        )}
        
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
        p: 1.5,
        transition: "transform 0.3s ease"
      }}>
        {/* Title */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: "600",
            fontSize: "0.8rem",
            color: "#3e2723",
            mb: 0.8,
            lineHeight: 1.3,
            letterSpacing: "0.02em"
          }}
        >
          {item.itemName || `${item.materialName} ${item.categoryName}`}
        </Typography>
        
        {/* Description */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: "#8d6e63",
            mb: 1,
            fontSize: "0.7rem",
            lineHeight: 1.4,
            fontStyle: "italic",
            opacity: 0.8
          }}
        >
          {item.description || `Exquisite ${item.materialName.toLowerCase()} ${item.categoryName.toLowerCase()} crafted with precision`}
        </Typography>
        
        {/* Details */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 1, 
          mb: 1,
          p: 1,
          background: "linear-gradient(135deg, rgba(255, 193, 7, 0.03) 0%, rgba(255, 143, 0, 0.02) 100%)",
          borderRadius: "8px",
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
              fontSize: "0.7rem",
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
                fontSize: "0.65rem",
                borderRadius: "6px",
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
              fontSize: "0.7rem",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              Weight
            </Typography>
            <Typography variant="body2" sx={{ 
              fontWeight: "600", 
              color: "#3e2723",
              fontSize: "0.8rem"
            }}>
              {item.weight}g
            </Typography>
          </Box>
        </Box>
        
      </CardContent>
    </Card>
  );
};

export default ItemCard;
