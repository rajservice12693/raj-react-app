import React from "react";
import { Box, Typography } from "@mui/material";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showSubtitle?: boolean;
  subtitle?: string;
  variant?: "header" | "sidebar" | "admin";
}

const Logo: React.FC<LogoProps> = ({ 
  size = "medium", 
  showSubtitle = true, 
  subtitle = "Rohit Alankar Jewellers",
  variant = "header"
}) => {
  const getSizeConfig = () => {
    switch (size) {
      case "small":
        return {
          fontSize: "16px",
          diamondSize: { width: "20px", height: "24px" },
          diamondFontSize: "8px",
          subtitleFontSize: "9px"
        };
      case "large":
        return {
          fontSize: "32px",
          diamondSize: { width: "36px", height: "40px" },
          diamondFontSize: "16px",
          subtitleFontSize: "11px"
        };
      default: // medium
        return {
          fontSize: "28px",
          diamondSize: { width: "28px", height: "32px" },
          diamondFontSize: "12px",
          subtitleFontSize: "11px"
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "sidebar":
        return {
          textColor: "#5d4037",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          subtitleColor: "#8d6e63"
        };
      case "admin":
        return {
          textColor: "#1a1a1a",
          textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
          subtitleColor: "rgba(0, 0, 0, 0.8)"
        };
      default: // header
        return {
          textColor: "#2c3e50",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          subtitleColor: "#8d6e63"
        };
    }
  };

  const sizeConfig = getSizeConfig();
  const variantStyles = getVariantStyles();

  return (
    <Box sx={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "12px",
      '@media (max-width: 480px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px'
      }
    }}>
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "0px",
        position: "relative",
        '@media (max-width: 768px)': {
          gap: "-2px"
        }
      }}>
        {/* R Letter */}
        <Box sx={{ 
          fontWeight: "900", 
          fontSize: sizeConfig.fontSize,
          '@media (max-width: 768px)': {
            fontSize: size === "large" ? "28px" : size === "small" ? "14px" : "24px"
          },
          '@media (max-width: 480px)': {
            fontSize: size === "large" ? "24px" : size === "small" ? "12px" : "20px"
          },
          background: variant === "admin" 
            ? "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 50%, #1a1a1a 100%)"
            : "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: variantStyles.textShadow,
          letterSpacing: "-1px",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: variant === "admin" ? 0.3 : 0.4,
            zIndex: -1
          }
        }}>
          R
        </Box>
        
        {/* Diamond A - Angular Shape */}
        <Box sx={{ 
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: sizeConfig.diamondSize.width,
          height: sizeConfig.diamondSize.height,
          margin: "0 -2px",
          zIndex: 2
        }}>
          {/* Outer glow - A shape */}
          <Box sx={{
            position: "absolute",
            top: "-2px",
            left: "-2px",
            right: "-2px",
            bottom: "-2px",
            background: "linear-gradient(45deg, #ffc107, #ff8f00, #ffb300, #ffc107)",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            opacity: 0.7
          }} />
          
          {/* Main diamond container - A shape */}
          <Box sx={{ 
            position: "relative",
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 50%, #ffb300 100%)",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(255, 193, 7, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.3)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            zIndex: 1,
            "&::before": {
              content: '""',
              position: "absolute",
              top: "2px",
              left: "2px",
              right: "2px",
              bottom: "2px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)",
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              zIndex: 1
            }
          }}>
            <Box sx={{ 
              fontSize: sizeConfig.diamondFontSize,
              zIndex: 2,
              position: "relative",
              filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.3))",
              transform: "translateY(-2px)"
            }}>
              💎
            </Box>
          </Box>
        </Box>
        
        {/* J Letter */}
        <Box sx={{ 
          fontWeight: "900", 
          fontSize: sizeConfig.fontSize,
          '@media (max-width: 768px)': {
            fontSize: size === "large" ? "28px" : size === "small" ? "14px" : "24px"
          },
          '@media (max-width: 480px)': {
            fontSize: size === "large" ? "24px" : size === "small" ? "12px" : "20px"
          },
          background: variant === "admin" 
            ? "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 50%, #1a1a1a 100%)"
            : "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: variantStyles.textShadow,
          letterSpacing: "-1px",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: variant === "admin" ? 0.3 : 0.4,
            zIndex: -1
          }
        }}>
          J
        </Box>
      </Box>
      
      {showSubtitle && (
        <Box sx={{ 
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2px"
        }}>
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: sizeConfig.subtitleFontSize,
              fontWeight: "600",
              color: variantStyles.subtitleColor,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              fontStyle: variant === "sidebar" ? "italic" : "normal",
              '@media (max-width: 480px)': {
                fontSize: size === "small" ? "8px" : "9px"
              }
            }}
          >
            {subtitle}
          </Typography>
          <Box sx={{
            height: "2px",
            width: "100%",
            background: "linear-gradient(90deg, #ffc107, #ff8f00, #ffb300, #ff8f00, #ffc107)",
            borderRadius: "1px",
            boxShadow: "0 1px 2px rgba(255, 193, 7, 0.3)"
          }} />
        </Box>
      )}
    </Box>
  );
};

export default Logo;
