// Footer.tsx - Simple Full Width
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (link: string) => {
    switch (link) {
      case "Contact":
        navigate("/contact");
        break;
      case "About Us":
        // Add about page route when created
       
        break;
      case "Shipping":
        // Add shipping page route when created
        break;
      case "Returns":
        // Add returns page route when created
        break;
      case "Privacy":
        // Add privacy page route when created
        break;
      case "Terms":
        // Add terms page route when created
        break;
      default:
        break;
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        background: "#ffebce",
        color: "#000",
        borderTop: "2px solid #000",
        width: "100%",
        margin: 0,
        padding: 0,
        position: "relative",
        left: 0,
        right: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Main Content */}
      <Box sx={{ width: "100%", py: 3, px: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            mb: 2,
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {[
            "About Us",
            "Contact",
            "Shipping",
            "Returns",
            "Privacy",
            "Terms",
          ].map((link) => (
            <Typography
              key={link}
              variant="body2"
              onClick={() => handleLinkClick(link)}
              sx={{
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.3s ease",
                "&:hover": { 
                  textDecoration: "underline",
                  color: "#ffc107",
                  transform: "translateY(-1px)"
                },
              }}
            >
              {link}
            </Typography>
          ))}
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          © {new Date().getFullYear()} R@J Jewellery. All rights reserved.
        </Typography>
      </Box>

      {/* Bottom Bar - Full Width */}
      <Box
        sx={{
          background: "#000",
          color: "#E5E4E2",
          py: 1,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* <Typography variant="caption" sx={{ fontWeight: "bold" }}>
          ✨ Premium Quality Guaranteed ✨
        </Typography> */}
      </Box>
    </Box>
  );
};

export default Footer;
