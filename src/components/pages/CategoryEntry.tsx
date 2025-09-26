import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Alert,
  Stack,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Card,
  Chip,
  Avatar,
  Pagination,
  InputAdornment,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { MasterService } from "../../services/MasterService";
import type { ICategoryModal } from "../common/modals/ICategoryModal";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import DiamondIcon from "@mui/icons-material/Diamond";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export const CategoryEntry = () => {
  const [validated, setValidated] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState<ICategoryModal[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [openCategoryItemDialog, setOpenCategoryItemDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        // Add your delete service call here
        // await MasterService.deleteCategory(categoryId);
        console.log("Deleting category:", categoryId);
        toast.success("Category deleted successfully");
        loadCategoryList();
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  const loadCategoryList = async () => {
    try {
      const categories = await MasterService.getCategories();
      setCategoryList(categories.data || categories);
      setTotalCount(categories.totalCount || categories.length);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    loadCategoryList();
  }, []);

  // Filter categories based on search term
  const filteredCategories = categoryList.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const paginatedCategories = filteredCategories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setValidated(true);

    if (!categoryName.trim()) {
      toast.error("Category name is required.");
      return;
    }

    const alreadyExist = categoryList.some(
      (catg) => catg.categoryName.toLowerCase() === categoryName.toLowerCase()
    );

    if (alreadyExist) {
      toast.error("Category already exists!");
      return;
    }

    try {
      const requestData = { categoryName };
      const categoryResponse = await MasterService.addCategory(requestData);

      if (categoryResponse?.status === 201) {
        toast.success("Category added successfully! 💎");
        setCategoryName("");
        setOpenCategoryItemDialog(false);
        loadCategoryList();
        setValidated(false);
        setPage(0); // Reset to first page after adding new category
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong.";
      toast.error(message);
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
            <CategoryIcon sx={{ fontSize: 32, color: "#fff" }} />
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
              Category Management
            </Typography>
            <Typography variant="body2" sx={{ color: "#7f8c8d", fontWeight: 500 }}>
              Organize your jewellery by categories efficiently
            </Typography>
          </Box>
        </Box>
        
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 600 }}>
            Create and manage jewellery categories
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenCategoryItemDialog(true)}
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
            Add Category
          </Button>
        </Stack>
      </Paper>

      {/* Search and Stats Section */}
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
        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
          alignItems: "center"
        }}>
          <TextField
            fullWidth
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0); // Reset to first page when searching
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#ffc107" }} />
                </InputAdornment>
              ),
            }}
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
          <Card sx={{ 
            p: 3, 
            textAlign: "center", 
            background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
            borderRadius: "12px",
            border: "1px solid rgba(33, 150, 243, 0.2)"
          }}>
            <Typography variant="h4" sx={{ 
              fontWeight: "bold", 
              background: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1
            }}>
              {filteredCategories.length}
            </Typography>
            <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: 600 }}>
              Categories
            </Typography>
            <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
              Total in database
            </Typography>
          </Card>
        </Box>
      </Paper>

      {/* Add Category Dialog */}
      <Dialog
        open={openCategoryItemDialog}
        onClose={() => setOpenCategoryItemDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            border: "1px solid rgba(255, 193, 7, 0.2)",
            background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
          },
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
          Add New Category
          <IconButton
            aria-label="close"
            onClick={() => setOpenCategoryItemDialog(false)}
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
          <TextField
            label="Category Name"
            name="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            fullWidth
            error={validated && !categoryName}
            helperText={
              validated && !categoryName
                ? "Category name is required"
                : "Enter a unique category name"
            }
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&:hover fieldset": { borderColor: "#C0C0C0" },
                "&.Mui-focused fieldset": { borderColor: "#C0C0C0" },
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={() => setOpenCategoryItemDialog(false)}
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
            Save Category
          </Button>
        </DialogActions>
      </Dialog>

      {/* Categories Table */}
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
            background: "linear-gradient(90deg, #4caf50, #66bb6a, #81c784, #4caf50)",
            backgroundSize: "300% 100%",
            animation: "gradientShift 3s ease infinite"
          }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar sx={{ 
            background: "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)",
            width: 48,
            height: 48,
            boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)"
          }}>
            <CategoryIcon sx={{ fontSize: 24, color: "#fff" }} />
          </Avatar>
          <Typography variant="h5" sx={{ 
            fontWeight: "bold", 
            color: "#2c3e50"
          }}>
            Categories List
          </Typography>
        </Box>

        <TableContainer sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
                }}
              >
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  #
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Category ID
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Category Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                    <Alert severity="info" sx={{ background: "transparent" }}>
                      {searchTerm
                        ? "No categories found matching your search."
                        : "No categories found."}
                    </Alert>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCategories.map((cat, index) => (
                  <TableRow
                    key={cat.categoryId}
                    sx={{
                      "&:nth-of-type(odd)": { background: "#f8f9fa" },
                      "&:hover": { background: "#e9ecef" },
                      transition: "background 0.3s ease",
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={cat.categoryId}
                        size="small"
                        sx={{
                          background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "1rem", fontWeight: "500" }}>
                      {cat.categoryName}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton size="small" sx={{ color: "#ffc107" }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: "#f44336" }}
                          onClick={() => handleDeleteCategory(cat.categoryId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", sm: "center" }}
            spacing={{ xs: 2, sm: 0 }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                textAlign: { xs: "center", sm: "left" },
                fontSize: { xs: "0.75rem", sm: "0.875rem" }
              }}
            >
              Showing {paginatedCategories.length} of{" "}
              {filteredCategories.length} categories
            </Typography>

            <Pagination
              count={totalPages}
              page={page + 1}
              onChange={(event, value) => {
                console.log("Page change event:", event);
                setPage(value - 1);
              }}
              color="primary"
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "8px",
                  border: "1px solid #d4af37",
                  "&:hover": { background: "#ffebce" },
                  fontSize: { xs: "0.75rem", sm: "0.875rem" }
                },
                "& .Mui-selected": {
                  background:
                    "linear-gradient(135deg, #d4af37 0%, #ffebce 100%)",
                  color: "#000",
                  fontWeight: "bold",
                },
              }}
            />

            <TextField
              select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              size="small"
              sx={{ 
                minWidth: { xs: 100, sm: 120 },
                "& .MuiSelect-select": {
                  fontSize: { xs: "0.75rem", sm: "0.875rem" }
                }
              }}
              SelectProps={{ native: true }}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </TextField>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};
