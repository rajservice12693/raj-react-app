import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Send as SendIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff8e1 0%, #ffecb3 50%, #ffe0b2 100%)",
        padding: { xs: "20px", sm: "40px", md: "60px" },
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
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(135deg, #d4af37 0%, #ffc107 25%, #ff8f00 50%, #d4af37 75%, #b8860b 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              letterSpacing: "0.02em",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#8d6e63",
              fontWeight: "400",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Get in touch with us for any inquiries about our exquisite jewelry collection.
            We're here to help you find the perfect piece.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Contact Cards */}
              <Card
                sx={{
                  background: "linear-gradient(135deg, #ffffff 0%, #faf9f7 100%)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 193, 7, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                        mr: 2,
                      }}
                    >
                      <EmailIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: "600", color: "#2c3e50" }}>
                      Email Us
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: "#8d6e63", mb: 1 }}>
                    info@rajjewellery.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8d6e63" }}>
                    sales@rajjewellery.com
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{
                  background: "linear-gradient(135deg, #ffffff 0%, #faf9f7 100%)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 193, 7, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                        mr: 2,
                      }}
                    >
                      <PhoneIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: "600", color: "#2c3e50" }}>
                      Call Us
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: "#8d6e63", mb: 1 }}>
                    +91 98765 43210
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8d6e63" }}>
                    +91 98765 43211
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{
                  background: "linear-gradient(135deg, #ffffff 0%, #faf9f7 100%)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 193, 7, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                        mr: 2,
                      }}
                    >
                      <LocationIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: "600", color: "#2c3e50" }}>
                      Visit Us
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: "#8d6e63", mb: 1 }}>
                    123 Jewelry Street
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8d6e63" }}>
                    Mumbai, Maharashtra 400001
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{
                  background: "linear-gradient(135deg, #ffffff 0%, #faf9f7 100%)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 193, 7, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                        mr: 2,
                      }}
                    >
                      <TimeIcon sx={{ color: "#fff", fontSize: 24 }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: "600", color: "#2c3e50" }}>
                      Business Hours
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: "#8d6e63", mb: 1 }}>
                    Mon - Sat: 10:00 AM - 8:00 PM
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#8d6e63" }}>
                    Sunday: 11:00 AM - 6:00 PM
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={24}
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #faf9f7 100%)",
                borderRadius: "24px",
                border: "1px solid rgba(255, 193, 7, 0.2)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                p: { xs: 3, sm: 4, md: 5 },
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
                }
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#2c3e50",
                  mb: 1,
                  textAlign: "center",
                }}
              >
                Send us a Message
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#8d6e63",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&.Mui-focused fieldset": { borderColor: "#ffc107" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&.Mui-focused fieldset": { borderColor: "#ffc107" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&.Mui-focused fieldset": { borderColor: "#ffc107" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&.Mui-focused fieldset": { borderColor: "#ffc107" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "&.Mui-focused fieldset": { borderColor: "#ffc107" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isSubmitting}
                      startIcon={<SendIcon />}
                      sx={{
                        background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "15px",
                        py: 2,
                        textTransform: "none",
                        fontSize: "1.1rem",
                        boxShadow: "0 8px 25px rgba(255, 193, 7, 0.3)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #ff8f00 0%, #ff6f00 100%)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 12px 35px rgba(255, 193, 7, 0.4)",
                        },
                        "&:disabled": {
                          background: "#e0e0e0",
                          color: "#9e9e9e",
                        },
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>

        {/* Social Media Section */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#2c3e50",
              mb: 3,
            }}
          >
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {[
              { icon: <FacebookIcon />, color: "#1877f2", label: "Facebook" },
              { icon: <InstagramIcon />, color: "#e4405f", label: "Instagram" },
              { icon: <TwitterIcon />, color: "#1da1f2", label: "Twitter" },
              { icon: <LinkedInIcon />, color: "#0077b5", label: "LinkedIn" },
            ].map((social, index) => (
              <IconButton
                key={index}
                sx={{
                  background: "linear-gradient(135deg, #ffffff 0%, #faf9f7 100%)",
                  border: "2px solid rgba(255, 193, 7, 0.2)",
                  borderRadius: "16px",
                  width: 56,
                  height: 56,
                  color: social.color,
                  "&:hover": {
                    background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                    color: "#fff",
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(255, 193, 7, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
                aria-label={social.label}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactPage;
