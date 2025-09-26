import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Backdrop,
  Card,
  Avatar,
  Chip,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import CategoryIcon from "@mui/icons-material/Category";
import { toast } from "react-toastify";
import type { ICategoryModal } from "../common/modals/ICategoryModal";
import type { IMaterialModal } from "../common/modals/IMaterialModal";
import { MasterService } from "../../services/MasterService";

export const MaterialEntry = () => {
  const [validated, setValidated] = useState(false);
  const [categoryList, setCategoryList] = useState<ICategoryModal[]>([]);
  const [materailFormData, setMaterailFormData] = useState({
    materialName: "",
    categoryId: "",
  });
  const [materialListDisplay, setMaterialListDisplay] = useState<
    IMaterialModal[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCategory = async () => {
    const category = await MasterService.getCategories();
    setCategoryList(category);
  };

  useEffect(() => {
    loadCategory();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!materailFormData.categoryId || !materailFormData.materialName.trim()) {
      setValidated(true);
      return;
    }

    const isConfirm = window.confirm(
      "Are you sure you want to save this material?"
    );
    if (!isConfirm) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await MasterService.addMaterial(materailFormData);
      if (response?.status === 201) {
        toast.success("Material saved successfully.");
        setMaterailFormData({
          materialName: "",
          categoryId: "",
        });
        setMaterialListDisplay([]);
        setValidated(false);
        loadCategory();
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error(error.response.message);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMaterailFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: any) => {
    const value = e.target.value as string;
    setMaterailFormData((prev) => ({
      ...prev,
      categoryId: value,
    }));

    const filterMaterial = categoryList.find((f) => f.categoryId === value);
    //   .filter((f) => f.categoryId === value)
    //   .flatMap((fMap) => fMap.materials);
    const filtered = filterMaterial?.materials || [];
    setMaterialListDisplay(filtered);
  };

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
      {/* Header Section */}
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
            <BuildIcon sx={{ fontSize: 32, color: "#fff" }} />
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
              Material Management
            </Typography>
            <Typography variant="body2" sx={{ color: "#7f8c8d", fontWeight: 500 }}>
              Add and manage materials for your jewellery categories
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 600 }}>
          Create materials and associate them with categories
        </Typography>
      </Paper>

      {/* Form Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          mb: 4, 
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar sx={{ 
            background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
            width: 48,
            height: 48,
            boxShadow: "0 4px 15px rgba(33, 150, 243, 0.3)"
          }}>
            <BuildIcon sx={{ fontSize: 24, color: "#fff" }} />
          </Avatar>
          <Typography variant="h5" sx={{ 
            fontWeight: "bold", 
            color: "#2c3e50"
          }}>
            Add New Material
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} noValidate>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 3,
              mb: 4,
            }}
          >
            <FormControl
              fullWidth
              required
              error={validated && !materailFormData.categoryId}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": { borderColor: "#ffc107" },
                  "&.Mui-focused fieldset": { borderColor: "#ffc107" },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ffc107",
                }
              }}
            >
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="categoryId"
                name="categoryId"
                value={materailFormData.categoryId}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>-- Select Category --</em>
                </MenuItem>
                {categoryList.map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              required
              id="materialName"
              name="materialName"
              label="Material Name"
              value={materailFormData.materialName}
              onChange={handleChange}
              error={validated && !materailFormData.materialName.trim()}
              helperText={
                validated &&
                !materailFormData.materialName.trim() &&
                "Material name is required."
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "&:hover fieldset": { borderColor: "#ffc107" },
                  "&.Mui-focused fieldset": { borderColor: "#ffc107" },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ffc107",
                }
              }}
            />

            <Box sx={{ alignSelf: "center" }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  boxShadow: "0 4px 15px rgba(255, 193, 7, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #ff8f00 0%, #ff6f00 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(255, 193, 7, 0.4)"
                  },
                  "&:disabled": {
                    background: "#ccc",
                    color: "#666"
                  }
                }}
              >
                {isSubmitting ? "Saving..." : "Save Material"}
              </Button>
            </Box>
          </Box>
        </form>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, mt: 4 }}>
          <Avatar sx={{ 
            background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
            width: 40,
            height: 40,
            boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)"
          }}>
            <CategoryIcon sx={{ fontSize: 20, color: "#fff" }} />
          </Avatar>
          <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 600 }}>
            Materials for Selected Category
          </Typography>
        </Box>

        {materialListDisplay.length === 0 ? (
          <Box sx={{ 
            p: 3, 
            textAlign: "center",
            background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
            borderRadius: "12px",
            border: "1px solid rgba(33, 150, 243, 0.2)"
          }}>
            <Typography variant="body1" sx={{ color: "#2c3e50", fontWeight: 500 }}>
              No materials found for the selected category.
            </Typography>
            <Typography variant="body2" sx={{ color: "#7f8c8d", mt: 1 }}>
              Select a category and add materials to get started.
            </Typography>
          </Box>
        ) : (
          <TableContainer sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
                }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Sr. No.</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Material ID</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Material Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materialListDisplay.map((cat, index) => (
                  <TableRow 
                    key={cat.materialId}
                    sx={{
                      "&:nth-of-type(odd)": { background: "#f8f9fa" },
                      "&:hover": { background: "#e9ecef" },
                      transition: "background 0.3s ease"
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold" }}>{index + 1}</TableCell>
                    <TableCell>
                      <Chip 
                        label={cat.materialId} 
                        size="small" 
                        sx={{ 
                          background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
                          color: "#fff",
                          fontWeight: "bold"
                        }} 
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "500" }}>{cat.materialName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Loader */}
      <Backdrop
        sx={{ 
          color: "#fff", 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "rgba(0, 0, 0, 0.7)"
        }}
        open={isSubmitting}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="inherit" size={60} />
          <Typography variant="h6" sx={{ mt: 2, color: "#fff" }}>
            Saving Material...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
};
