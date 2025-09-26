import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import HeaderUser from "./HeaderUser";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";

const Layout = ({ children }: any) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLoginButton = () => {
    navigate("/login");
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <CssBaseline />
      
      {/* Header - Full Width */}
      <Box sx={{ width: '100%', flexShrink: 0 }}>
        {isAuthenticated ? (
          <HeaderUser
            onMenuToggle={handleSidebarToggle}
            onLogout={handleLogout}
            userName={user || ""}
          />
        ) : (
          <Header onLoginClick={handleLoginButton} />
        )}
      </Box>

      {/* Sidebar */}
      {isAuthenticated && (
        <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
      )}

      {/* Main Content - Full Width with proper scrolling */}
      <Box 
        sx={{ 
          flex: 1,
          width: '100%',
          display: 'flex',
          minHeight: 0
        }}
      >
        <MainContent sidebarOpen={sidebarOpen}>
          <Box 
            sx={{ 
              width: '100%',
              minHeight: '100%',
              overflowX: 'hidden',
              padding: 0,
              margin: 0,
              boxSizing: 'border-box'
            }}
          >
            {children}
          </Box>
        </MainContent>
      </Box>

      {/* Footer - Full Width */}
      <Box sx={{ width: '100%', flexShrink: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;