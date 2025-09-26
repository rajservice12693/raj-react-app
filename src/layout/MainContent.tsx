// MainContent.tsx
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "sidebarOpen",
})<{
  sidebarOpen?: boolean;
}>(({ theme, sidebarOpen }) => ({
  flexGrow: 1,
  width: '100%',
  paddingTop: '120px', // Add padding to account for fixed header
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
    marginLeft: 0,
  }),
}));

const MainContent = ({ sidebarOpen, children }: any) => {
  return (
    <Main sidebarOpen={sidebarOpen}>
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