// LoginPage.tsx
import React, { useState, type ChangeEvent } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../../services/LoginService";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [loginFormData, setLoginFormData] = useState({
    emailId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!loginFormData.emailId) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }
    if (!loginFormData.password) {
      setError("Password is required");
      setIsLoading(false);
      return;
    }

    try {
      const loginResponse = await LoginService.login(loginFormData);
      if (loginResponse?.status === 200) {
        toast.success("Login successfully !!!");
        // Use auth context to handle login
        login(loginResponse.data.userName);
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 50%, #ffe0b2 100%)",
        padding: "40px 0",
        marginTop: "0",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"%23ffffff\" opacity=\"0.1\"/><circle cx=\"10\" cy=\"60\" r=\"0.5\" fill=\"%23ffffff\" opacity=\"0.1\"/><circle cx=\"90\" cy=\"40\" r=\"0.5\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
          opacity: 0.3
        },
        '@media (max-width: 768px)': {
          marginTop: "0",
          minHeight: "100vh",
          padding: "30px 0"
        }
      }}
    >
      <Paper
        elevation={24}
        sx={{
          width: "100%",
          maxWidth: { xs: "90vw", sm: "400px", md: "420px" },
          p: { xs: 3, sm: 3.5 },
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          mx: { xs: 2, sm: 0 },
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #ffc107, #ff8f00, #ffb300, #ffc107, #ff8f00, #ffb300)",
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
        {/* Beautiful Header */}
        <Box sx={{ textAlign: "center", mb: 2.5 }}>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            mb: 1.5,
            "& .diamond": {
              fontSize: "1.5rem",
              color: "#ffc107",
              animation: "sparkle 2s ease-in-out infinite alternate"
            }
          }}>
            <span className="diamond">💎</span>
          </Box>
          <Typography
            variant="h4"
            sx={{
              background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 50%, #ffe0b2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
              mb: 0.5,
              fontSize: { xs: "1.3rem", sm: "1.6rem" }
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#666",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              fontWeight: "300"
            }}
          >
            Sign in to your admin account
          </Typography>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: "8px",
              border: "1px solid #ff4444"
            }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email Address *"
            type="email"
            name="emailId"
            autoComplete="email"
            value={loginFormData.emailId}
            onChange={handleChange}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                '&:hover': {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)"
                },
                '&:hover fieldset': {
                  borderColor: "#ffc107",
                  borderWidth: "2px"
                },
                '&.Mui-focused': {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 30px rgba(255, 193, 7, 0.3)"
                },
                '&.Mui-focused fieldset': {
                  borderColor: "#ffc107",
                  borderWidth: "2px"
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: "#ffc107",
                fontWeight: "600"
              },
            }}
          />
          
          <TextField
            label="Password *"
            type={showPassword ? "text" : "password"}
            value={loginFormData.password}
            onChange={handleChange}
            fullWidth
            name="password"
            autoComplete="current-password"
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                '&:hover': {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)"
                },
                '&:hover fieldset': {
                  borderColor: "#ffc107",
                  borderWidth: "2px"
                },
                '&.Mui-focused': {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 30px rgba(255, 193, 7, 0.3)"
                },
                '&.Mui-focused fieldset': {
                  borderColor: "#ffc107",
                  borderWidth: "2px"
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: "#ffc107",
                fontWeight: "600"
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleShowPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                    sx={{ color: "#666" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{
              background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 50%, #ffe0b2 100%)",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              py: 1.5,
              borderRadius: "16px",
              textTransform: "none",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
              '&:hover': {
                background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                transform: "translateY(-3px)",
                boxShadow: "0 15px 35px rgba(102, 126, 234, 0.6)",
              },
              '&:active': {
                transform: "translateY(-1px)",
              },
              '&:disabled': {
                background: "linear-gradient(135deg, #cccccc, #999999)",
                color: "#666666",
                transform: "none",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              },
              '&::before': {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                transition: "left 0.5s",
              },
              '&:hover::before': {
                left: "100%",
              }
            }}
          >
            {isLoading ? "LOGGING IN..." : "SIGN IN"}
          </Button>
        </Box>

        <Box sx={{ 
          mt: 2.5, 
          display: "flex", 
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between", 
          alignItems: { xs: "center", sm: "center" },
          gap: { xs: 1.5, sm: 0 }
        }}>
          <Link
            href="/forgot-password"
            underline="none"
            sx={{
              color: "#ffc107",
              fontWeight: "500",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              transition: "all 0.3s ease",
              '&:hover': {
                color: "#45b7d1",
                transform: "translateY(-1px)",
              },
            }}
          >
            Forgot Password?
          </Link>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ 
              color: "#666", 
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontWeight: "300"
            }}>
              New here?
            </Typography>
            <Link
              href="/signup"
              underline="none"
              sx={{
                color: "#ffc107",
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                transition: "all 0.3s ease",
                '&:hover': {
                  color: "#45b7d1",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Sign Up
            </Link>
          </Box>
        </Box>

        {/* Beautiful Footer */}
        <Box sx={{ textAlign: "center", mt: 2.5 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: "#666", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: 1,
              fontSize: "0.8rem",
              fontWeight: "300",
              "& .sparkle": {
                animation: "sparkle 2s ease-in-out infinite alternate"
              }
            }}
          >
            <span className="sparkle">✨</span> 
            Premium Jewelry Access 
            <span className="sparkle">✨</span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;