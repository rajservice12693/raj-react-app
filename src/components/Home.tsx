import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { LoginService } from "../services/LoginService";
import { MasterService } from "../services/MasterService";
import type { ItemModal } from "./common/modals/ItemModal";
import type { IMaterialModal } from "./common/modals/IMaterialModal";
import ItemCard from "./common/ItemCard";
import { ImageCarousel } from "./common/ImageCarousel";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import DiamondIcon from "@mui/icons-material/Diamond";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [itemList, setItemList] = useState<ItemModal[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemModal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  // Filter states
  const [materials, setMaterials] = useState<IMaterialModal[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 100000 });
  // const [selectedOccasion, setSelectedOccasion] = useState<string>("");
  // const [selectedGender, setSelectedGender] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchAllItems = async () => {
    const response = await LoginService.getItems();
    setItemList(response.data);
    setFilteredItems(response.data);
  };


  const fetchMaterials = async () => {
    try {
      const response = await MasterService.getMaterials();
      setMaterials(response.data || response);
    } catch (error) {
      console.error("Failed to load materials:", error);
    }
  };

  useEffect(() => {
    fetchAllItems();
    fetchMaterials();
  }, []);

  // Filter handlers
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(category, selectedMaterials, priceRange, searchTerm);
  };

  const handleMaterialToggle = (materialId: string) => {
    const newSelectedMaterials = selectedMaterials.includes(materialId)
      ? selectedMaterials.filter(id => id !== materialId)
      : [...selectedMaterials, materialId];
    setSelectedMaterials(newSelectedMaterials);
    applyFilters(selectedCategory, newSelectedMaterials, priceRange, searchTerm);
  };

  const handlePriceRangeChange = (field: 'min' | 'max', value: number) => {
    const newPriceRange = { ...priceRange, [field]: value };
    setPriceRange(newPriceRange);
    applyFilters(selectedCategory, selectedMaterials, newPriceRange, searchTerm);
  };

  // const handleOccasionChange = (occasion: string) => {
  //   setSelectedOccasion(occasion);
  //   applyFilters(selectedCategory, selectedMaterials, priceRange, searchTerm);
  // };

  // const handleGenderChange = (gender: string) => {
  //   setSelectedGender(gender);
  //   applyFilters(selectedCategory, selectedMaterials, priceRange, searchTerm);
  // };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    applyFilters(selectedCategory, selectedMaterials, priceRange, search);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedMaterials([]);
    setPriceRange({ min: 0, max: 100000 });
    setSearchTerm("");
      setFilteredItems(itemList);
  };

  const applyFilters = (
    category: string,
    materials: string[],
    price: { min: number; max: number },
    search: string
  ) => {
    let filtered = itemList;

    // Category filter
    if (category !== "All") {
      filtered = filtered.filter(item => item.categoryName === category);
    }

    // Material filter
    if (materials.length > 0) {
      filtered = filtered.filter(item => materials.includes(item.materialId.toString()));
    }

    // Price filter
    filtered = filtered.filter(item => 
      item.price >= price.min && item.price <= price.max
    );

    // Search filter
    if (search) {
      filtered = filtered.filter(item => 
        item.itemName.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const categoryOptions = [
    "All",
    ...Array.from(new Set(itemList.map((i) => i.categoryName))),
  ];

  return (
    <>
      {/* Banner Carousel */}
      <Box sx={{ 
        marginTop: "80px", // Account for fixed header height
        marginLeft: { xs: 2, sm: 3, md: 4 },
        marginRight: { xs: 2, sm: 3, md: 4 },
        marginBottom: { xs: 2, sm: 3, md: 4 },
        padding: 0,
          position: "relative",
        zIndex: 1,
        width: "auto",
        '@media (max-width: 768px)': {
          marginTop: "70px" // Slightly less on mobile
        }
      }}>
        <ImageCarousel
          images={[
            "/images/Banner1.jpg",
            "/images/Banner2.jpg", 
            "/images/Banner3.jpg"
          ]}
          autoPlay={true}
          autoPlayInterval={6000}
          showIndicators={false}
          showArrows={false}
          height="40vh"
          overlayText={undefined}
        />
      </Box>

      {/* ✅ Beautiful Filters Section */}
      {/* <Container
        sx={{
          mt: 4,
          mb: 4,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          py: 4,
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      > */}
        {/* <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(135deg, #ffc107, #ff8f00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Discover Our Collection
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#8d6e63", fontWeight: "300" }}
          >
            Filter by category to find your perfect piece
          </Typography>
        </Box> */}

        {/* <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={3}
        >
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#4ecdc4",
                    "& + .MuiSwitch-track": {
                      backgroundColor: "#4ecdc4",
                    },
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{ color: "#666", fontWeight: "500" }}
              >
                {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </Typography>
            }
          />

          <Stack
            direction="row"
            spacing={1.5}
            flexWrap="wrap"
            sx={{
              justifyContent: { xs: "center", sm: "flex-end" },
              gap: 1.5,
            }}
          >
            {categoryOptions.map((category) => (
              <Chip
                key={category}
                label={category === "All" ? "✨ All" : `💎 ${category}`}
                onClick={() => handleCategoryFilter(category)}
                sx={{
                  background:
                    selectedCategory === category
                      ? "linear-gradient(135deg, #ffc107, #ff8f00)"
                      : "rgba(255, 255, 255, 0.8)",
                  color: selectedCategory === category ? "#5d4037" : "#8d6e63",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  border:
                    selectedCategory === category
                      ? "none"
                      : "1px solid rgba(255, 193, 7, 0.3)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  height: { xs: "32px", sm: "36px" },
                  "&:hover": {
                    background:
                      selectedCategory === category
                        ? "linear-gradient(135deg, #ffb300, #ff6f00)"
                        : "rgba(255, 193, 7, 0.1)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 15px rgba(255, 193, 7, 0.2)",
                  },
                }}
              />
            ))}
          </Stack>
        </Box> */}
      {/* </Container> */}

      {/* Elegant Filter Sidebar and Main Content */}
      <Box sx={{ 
        py: { xs: 3, sm: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: "100%"
      }}>
        <Box sx={{ display: "flex", gap: { xs: 2, sm: 3, md: 4 }, flexDirection: { xs: "column", lg: "row" } }}>
          {/* Elegant Filter Sidebar */}
          <Paper 
            elevation={0} 
        sx={{
              width: { xs: "100%", lg: "320px" },
              height: "fit-content",
              background: "linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #f5f2ed 100%)",
          borderRadius: "24px",
              border: "1px solid rgba(212, 175, 55, 0.1)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(212, 175, 55, 0.1)",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #d4af37 0%, #ffc107 25%, #ff8f00 50%, #ffc107 75%, #d4af37 100%)",
                backgroundSize: "200% 100%",
                animation: "elegantShimmer 4s ease-in-out infinite"
              },
              display: { xs: showFilters ? "block" : "none", lg: "block" }
            }}
          >
            <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
          mb: 4,
                pb: 2,
                borderBottom: "1px solid rgba(212, 175, 55, 0.1)"
              }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box sx={{
                    p: 1,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FilterListIcon sx={{ color: "#d4af37", fontSize: 20 }} />
                  </Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: "600", 
                    color: "#2c3e50",
                    letterSpacing: "0.02em"
                  }}>
                    Refine Your Search
                  </Typography>
                </Box>
                
                <Button
                  onClick={clearFilters}
                  size="small"
                  sx={{
                    color: "#d4af37",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    textTransform: "none",
                    textDecoration: "underline",
                    minWidth: "auto",
                    px: 1,
                    py: 0.5,
                    "&:hover": {
                      color: "#b8860b",
                      backgroundColor: "rgba(212, 175, 55, 0.05)",
                      textDecoration: "none"
                    }
                  }}
                >
                  Clear All
                </Button>
              </Box>

              {/* Elegant Search Filter */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ 
                  color: "#5d4037", 
                  fontWeight: "600", 
                  mb: 1.5,
                  letterSpacing: "0.02em"
                }}>
                  Search
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Search for exquisite pieces..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#d4af37" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(10px)",
                      "&:hover fieldset": { 
                        borderColor: "#d4af37",
                        boxShadow: "0 0 0 2px rgba(212, 175, 55, 0.1)"
                      },
                      "&.Mui-focused fieldset": { 
                        borderColor: "#d4af37",
                        boxShadow: "0 0 0 3px rgba(212, 175, 55, 0.15)"
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#5d4037",
                      "&::placeholder": {
                        color: "#8d6e63",
                        opacity: 0.8
                      }
                    }
                  }}
                />
                  </Box>

                  {/* Elegant Category Filter */}
              <Accordion 
                defaultExpanded 
                sx={{ 
                  mb: 3, 
                  boxShadow: "none",
                  "&:before": { display: "none" },
                  "&.Mui-expanded": {
                    margin: "0 0 24px 0"
                  }
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon sx={{ color: "#d4af37" }} />}
                  sx={{
                    "&.Mui-expanded": {
                      minHeight: "48px"
                    },
                    "& .MuiAccordionSummary-content": {
                      margin: "12px 0"
                    }
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{
                      p: 0.5,
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <CategoryIcon sx={{ color: "#d4af37", fontSize: 18 }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: "600",
                      color: "#2c3e50",
                      letterSpacing: "0.02em"
                    }}>
                      Categories
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {categoryOptions.map((category) => (
                      <ListItem key={category} disablePadding>
                        <ListItemButton
                          onClick={() => handleCategoryFilter(category)}
                          selected={selectedCategory === category}
                          sx={{
                            borderRadius: "8px",
                            mb: 1,
                            "&.Mui-selected": {
                              background: "linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 152, 0, 0.1) 100%)",
                              "&:hover": {
                                background: "linear-gradient(135deg, rgba(255, 193, 7, 0.3) 0%, rgba(255, 152, 0, 0.2) 100%)",
                              }
                            }
                          }}
                        >
                          <ListItemText 
                            primary={category === "All" ? "✨ All Categories" : `💎 ${category}`} 
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Materials Filter */}
              {materials.length > 0 && (
                <Accordion defaultExpanded sx={{ mb: 2, boxShadow: "none" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DiamondIcon sx={{ color: "#ffc107", fontSize: 20 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Materials
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      {materials.map((material) => (
                        <ListItem key={material.materialId} disablePadding>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedMaterials.includes(material.materialId)}
                                onChange={() => handleMaterialToggle(material.materialId)}
                                sx={{ color: "#ffc107" }}
                              />
                            }
                            label={material.materialName}
                            sx={{ width: "100%" }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Price Range Filter */}
              {/* <Accordion sx={{ mb: 2, boxShadow: "none" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AttachMoneyIcon sx={{ color: "#ffc107", fontSize: 20 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Price Range
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <TextField
                      size="small"
                      label="Min"
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', Number(e.target.value))}
                      sx={{ flex: 1 }}
                    />
                    <Typography>-</Typography>
                    <TextField
                      size="small"
                      label="Max"
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', Number(e.target.value))}
                      sx={{ flex: 1 }}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion> */}

              {/* Occasion Filter */}
              {/* <Accordion sx={{ mb: 2, boxShadow: "none" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EventIcon sx={{ color: "#ffc107", fontSize: 20 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Occasion
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl fullWidth size="small">
                    <Select
                      value={selectedOccasion}
                      onChange={(e) => handleOccasionChange(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">All Occasions</MenuItem>
                      <MenuItem value="wedding">Wedding</MenuItem>
                      <MenuItem value="engagement">Engagement</MenuItem>
                      <MenuItem value="daily">Daily Wear</MenuItem>
                      <MenuItem value="party">Party</MenuItem>
                      <MenuItem value="formal">Formal</MenuItem>
                    </Select>
                  </FormControl>
                </AccordionDetails>
              </Accordion> */}

              {/* Gender Filter */}
              {/* <Accordion sx={{ mb: 2, boxShadow: "none" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonIcon sx={{ color: "#ffc107", fontSize: 20 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Gender
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl fullWidth size="small">
                    <Select
                      value={selectedGender}
                      onChange={(e) => handleGenderChange(e.target.value)}
                      displayEmpty
                    >
                      <MenuItem value="">All Genders</MenuItem>
                      <MenuItem value="men">Men</MenuItem>
                      <MenuItem value="women">Women</MenuItem>
                      <MenuItem value="unisex">Unisex</MenuItem>
                    </Select>
                  </FormControl>
                </AccordionDetails>
              </Accordion> */}

            </Box>
          </Paper>

          {/* Main Content Area */}
          <Box sx={{ flex: 1 }}>
            {/* Mobile Filter Toggle */}
            <Box sx={{ display: { xs: "block", lg: "none" }, mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  background: "linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)",
                  color: "#fff",
                  borderRadius: "12px",
                  px: 3,
                  py: 1,
                  "&:hover": {
                    background: "linear-gradient(135deg, #ff8f00 0%, #ff6f00 100%)",
                  }
                }}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </Box>

            {/* Elegant Items Grid */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2.5, sm: 3, md: 4 }, 
                background: "linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #f5f2ed 100%)",
                borderRadius: "24px",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(212, 175, 55, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.1)",
          backdropFilter: "blur(10px)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #d4af37 0%, #ffc107 25%, #ff8f00 50%, #ffc107 75%, #d4af37 100%)",
                  backgroundSize: "200% 100%",
                  animation: "elegantShimmer 4s ease-in-out infinite"
                }
              }}
            >
              <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
                  variant="h4"
            sx={{
                    fontWeight: "400",
                    background: "linear-gradient(135deg, #d4af37 0%, #ffc107 25%, #ff8f00 50%, #d4af37 75%, #b8860b 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
                    mb: 2,
                    letterSpacing: "0.02em",
                    textShadow: "0 2px 4px rgba(212, 175, 55, 0.2)",
            }}
          >
            {selectedCategory === "All"
                    ? "✨ Our Exquisite Collection"
              : `💎 ${selectedCategory} Collection`}
          </Typography>
          <Typography
                  variant="body1"
                  sx={{ 
                    color: "#8d6e63", 
                    fontWeight: "400",
                    letterSpacing: "0.02em",
                    fontSize: "1.1rem"
                  }}
          >
            {filteredItems.length}{" "}
                  {filteredItems.length === 1 ? "exquisite piece" : "exquisite pieces"} found
          </Typography>
                
                {/* Elegant divider */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 3,
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "60px",
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                    }}
                  />
                  <Box
                    sx={{
                      width: "6px",
                      height: "6px",
                      background: "linear-gradient(135deg, #d4af37, #ffc107)",
                      borderRadius: "50%",
                      boxShadow: "0 0 8px rgba(212, 175, 55, 0.4)",
                    }}
                  />
                  <Box
                    sx={{
                      width: "60px",
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                    }}
                  />
                </Box>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
          sx={{
            justifyContent: "center",
            padding: { xs: 1, sm: 2 },
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
              <Grid key={item.id}>
                <Box sx={{ width: "100%", maxWidth: "320px" }}>
                  <ItemCard item={item} />
                </Box>
              </Grid>
            ))
          ) : (
            <Grid>
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  background:
                    "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                  borderRadius: "20px",
                  border: "2px dashed #dee2e6",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#6c757d",
                    mb: 2,
                    fontWeight: "500",
                  }}
                >
                  🔍 No items found
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#adb5bd",
                    fontSize: "0.9rem",
                  }}
                >
                  Try selecting a different category or check back later for new
                  arrivals
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
            </Paper>
          </Box>
        </Box>
      </Box>
      
    </>
  );
};

export default Home;
