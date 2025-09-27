import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
  Stack,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DiamondIcon from "@mui/icons-material/Diamond";
import InventoryIcon from "@mui/icons-material/Inventory";
import { toast } from "react-toastify";
import { MasterService } from "../../services/MasterService";
import { Service } from "../../services/Service/Service";
import type { ICategoryModal } from "../common/modals/ICategoryModal";
import type { IMaterialModal } from "../common/modals/IMaterialModal";

interface FormDataType {
  itemName: string;
  categoryId: string;
  materialId: string;
  purity: string;
  weight: string;
  price: string;
  stockQuantity: string;
  description: string;
  images: File[];
}

export const JewelleryEntry: React.FC = () => {
  const [categoryList, setCategoryList] = useState<ICategoryModal[]>([]);
  const [materialsList, setMaterialsList] = useState<IMaterialModal[]>([]);
  const [itemsDbList, setItemsDbList] = useState<any[]>([]);

  const [openDialog, setOpenDialog] = useState(false);

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    itemName: "",
    categoryId: "",
    materialId: "",
    purity: "",
    weight: "",
    price: "",
    stockQuantity: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    const loadInitialMasterData = async () => {
      try {
        const cats = await MasterService.getCategories();
        setCategoryList(cats);
        handleItemsList();
      } catch (err) {
        console.error("Error loading categories", err);
        toast.error("Failed to load categories");
      }
    };
    loadInitialMasterData();
  }, []);

  const handleItemsList = async () => {
    const itemsDbList = await Service.items();
    console.log(itemsDbList);
    setItemsDbList(itemsDbList.data);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: any) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      materialId: "", // reset material when category changes
    }));

    // filter materials
    const selected = categoryList.find((c) => c.categoryId === value);
    if (selected && selected.materials) {
      setMaterialsList(selected.materials);
    } else {
      setMaterialsList([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: filesArray,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidated(true);

    // Basic validation
    if (
      !formData.itemName ||
      !formData.categoryId ||
      !formData.materialId ||
      !formData.weight ||
      !formData.price ||
      formData.images.length === 0
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const formDataRequest = new FormData();
    formDataRequest.append(
      "payload",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    formData.images.forEach((file) => {
      formDataRequest.append("images", file);
    });

    try {
      const itemResponse = await Service.uploadItem(formDataRequest);
      if (itemResponse?.status === 201) {
        toast.success("Item saved successfully!");
        // Reset
        setFormData({
          itemName: "",
          categoryId: "",
          materialId: "",
          purity: "",
          weight: "",
          price: "",
          stockQuantity: "",
          description: "",
          images: [],
        });
        setValidated(false);
        setOpenDialog(false);
        handleItemsList();
      } else {
        toast.error("Failed to save item");
      }
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || error.message;
      toast.error(`Error ${status || ""}: ${message}`);
    }
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
            <InventoryIcon sx={{ fontSize: 32, color: "#fff" }} />
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
              Jewellery Management
            </Typography>
            <Typography variant="body2" sx={{ color: "#7f8c8d", fontWeight: 500 }}>
              Add and manage your jewellery inventory
            </Typography>
          </Box>
        </Box>
        
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 600 }}>
            Manage your jewellery collection with ease
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "15px",
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
              }
            }}
          >
            Add Jewellery Item
          </Button>
        </Stack>
      </Paper>

      {/* Add Jewellery Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            border: "1px solid rgba(255, 193, 7, 0.2)",
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
          }
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
            color: "#fff",
            borderBottom: "1px solid rgba(255, 193, 7, 0.3)",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <DiamondIcon />
          Add New Jewellery Item
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: "#fff",
              background: "rgba(255,255,255,0.2)",
              "&:hover": { background: "rgba(255,255,255,0.3)" }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 3 }}>
          <Box
            component="form"
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              gap: 3,
              mt: 1,
            }}
          >
            <TextField
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
              fullWidth
              error={validated && !formData.itemName}
              helperText={
                validated && !formData.itemName
                  ? "Item name is required"
                  : ""
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
            <FormControl
              required
              fullWidth
              error={validated && !formData.categoryId}
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
                name="categoryId"
                value={formData.categoryId}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">
                  <em>-- Select Category --</em>
                </MenuItem>
                {categoryList.map((cat) => (
                  <MenuItem key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
                <FormControl
                  required
                  fullWidth
                  error={validated && !formData.materialId}
                >
                  <InputLabel id="material-label">Material</InputLabel>
                  <Select
                    labelId="material-label"
                    name="materialId"
                    value={formData.materialId}
                    label="Material"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>-- Select Material --</em>
                    </MenuItem>
                    {materialsList.map((mat) => (
                      <MenuItem key={mat.materialId} value={mat.materialId}>
                        {mat.materialName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Purity"
                  name="purity"
                  value={formData.purity}
                  onChange={handleChange}
                  inputProps={{ maxLength: 20 }}
                  fullWidth
                />
                <TextField
                  label="Weight (g)"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Price (₹)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Stock Quantity"
                  name="stockQuantity"
                  type="number"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                />
                <Button variant="outlined" component="label" fullWidth>
                  Upload Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
                {formData.images.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    {formData.images.map((file, idx) => (
                      <Typography variant="body2" key={idx}>
                        {idx + 1}. {file.name}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            variant="outlined"
            sx={{
              borderColor: "#ffc107",
              color: "#ffc107",
              borderRadius: "12px",
              px: 3,
              "&:hover": { 
                borderColor: "#ff8f00",
                backgroundColor: "rgba(255, 193, 7, 0.1)"
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            sx={{
              background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "12px",
              px: 3,
              "&:hover": {
                background: "linear-gradient(135deg, #ff8f00 0%, #ff6f00 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(255, 193, 7, 0.4)"
              }
            }}
          >
            Save Item
          </Button>
        </DialogActions>
      </Dialog>

      {/* Items List Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
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
            <InventoryIcon sx={{ fontSize: 24, color: "#fff" }} />
          </Avatar>
          <Typography variant="h5" sx={{ 
            fontWeight: "bold", 
            color: "#2c3e50"
          }}>
            Jewellery Inventory
          </Typography>
        </Box>

        {itemsDbList.length == 0 ? (
          <Alert 
            severity="info" 
            sx={{ 
              borderRadius: "12px",
              background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              border: "1px solid rgba(33, 150, 243, 0.2)"
            }}
          >
            No jewellery items found. Add your first item to get started!
          </Alert>
        ) : (
          <TableContainer sx={{ borderRadius: "12px", overflow: "hidden" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)"
                }}>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Sr No.</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Item Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Category</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Material</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Purity</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Weight(g)</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemsDbList.map((item, index) => (
                  <TableRow 
                    key={item.id}
                    sx={{
                      "&:nth-of-type(odd)": { background: "#f8f9fa" },
                      "&:hover": { background: "#e9ecef" },
                      transition: "background 0.3s ease"
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold" }}>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: "500" }}>{item.itemName}</TableCell>
                    <TableCell>
                      <Chip 
                        label={item.categoryName} 
                        size="small" 
                        sx={{ 
                          background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                          color: "#fff",
                          fontWeight: "bold"
                        }} 
                      />
                    </TableCell>
                    <TableCell>{item.materialName}</TableCell>
                    <TableCell>{item.purity}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                      ₹{item.price}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};
