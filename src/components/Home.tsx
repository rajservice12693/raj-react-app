import {
  Box,
  Typography,
  Grid,
  Container,
  Chip,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { LoginService } from "../services/LoginService";
import type { ItemModal } from "./common/modals/ItemModal";
import ItemCard from "./common/ItemCard";

const Home = () => {
  const [itemList, setItemList] = useState<ItemModal[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemModal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [darkMode, setDarkMode] = useState(false);

  const fetchAllItems = async () => {
    const response = await LoginService.getItems();
    setItemList(response.data);
    setFilteredItems(response.data);
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredItems(itemList);
    } else {
      setFilteredItems(
        itemList.filter((item) => item.categoryName === category)
      );
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(itemList.map((i) => i.categoryName))),
  ];

  return (
    <>
      {/* ✅ Beautiful Header Section */}
      <Box
        sx={{
          height: { xs: "300px", sm: "400px", md: "500px" },
          background:
            "linear-gradient(135deg, #fff8e1 0%, #ffecb3 50%, #ffe0b2 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5d4037",
          textAlign: "center",
          marginTop: { xs: "50px", sm: "60px" },
          padding: 0,
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="sparkles" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffc107" opacity="0.4"/><circle cx="10" cy="10" r="0.5" fill="%23ff8f00" opacity="0.6"/><circle cx="40" cy="15" r="0.8" fill="%23ffc107" opacity="0.5"/><circle cx="15" cy="40" r="0.6" fill="%23ff8f00" opacity="0.4"/><circle cx="35" cy="35" r="0.4" fill="%23ffc107" opacity="0.7"/></pattern></defs><rect width="100" height="100" fill="url(%23sparkles)"/></svg>\')',
            animation: "float 6s ease-in-out infinite",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(255, 193, 7, 0.3)",
              mb: 2,
              background: "linear-gradient(45deg, #5d4037, #8d6e63)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome to the
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              fontWeight: "900",
              textShadow: "3px 3px 6px rgba(255, 193, 7, 0.4)",
              background: "linear-gradient(45deg, #ffc107, #ff8f00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              // animation: "sparkle 3s ease-in-out infinite alternate",
            }}
          >
            Rohit Alankar Jewellery
          </Typography>
          {/* <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: "300",
              opacity: 0.8,
              mt: 2,
              color: "#8d6e63",
              textShadow: "1px 1px 2px rgba(255, 193, 7, 0.2)",
            }}
          >
            Discover Exquisite Pieces of Art
          </Typography> */}
        </Box>
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
            {categories.map((category) => (
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

      {/* ✅ Beautiful Main Content: Filtered Item List */}
      <Container
        maxWidth="xl"
        sx={{
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          py: 4,
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          mb: 4,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(135deg, #ffc107, #ff8f00)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            {selectedCategory === "All"
              ? "✨ All Jewelry Items"
              : `💎 ${selectedCategory} Collection`}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#8d6e63", fontWeight: "300" }}
          >
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"} found
          </Typography>
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
          {itemList.length > 0 ? (
            itemList.map((item) => (
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
      </Container>
    </>
  );
};

export default Home;
