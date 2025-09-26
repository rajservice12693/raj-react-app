// MainContent.tsx
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "sidebarOpen" && prop !== "isAuthenticated",
})<{
  sidebarOpen?: boolean;
  isAuthenticated?: boolean;
}>(({ theme, sidebarOpen, isAuthenticated }) => ({
  flexGrow: 1,
  width: '100%',
  paddingTop: isAuthenticated ? '90px' : 0, // Precise padding for authenticated users (AdminDashboard)
  minHeight: '100vh',
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(sidebarOpen && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: '280px', // Account for sidebar width
  }),
}));

const MainContent = ({ sidebarOpen, children }: any) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Main sidebarOpen={sidebarOpen} isAuthenticated={isAuthenticated}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          margin: 0
        }}
      >
        {children}
      </Box>
    </Main>
  );
};

export default MainContent;