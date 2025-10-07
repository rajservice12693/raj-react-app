import { Card, CardContent, Typography, Box, Chip, Modal, IconButton, Tooltip } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState, useEffect, useRef } from "react";
import "./ItemCard.css";

const ItemCard = ({ item }: { item: any }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  
  // Zoom functionality states
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);


  // Auto-play on hover
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isHovered && item.images && item.images.length > 1) {
      console.log('Starting carousel auto-play for item:', item.itemName || item.materialName);
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const next = (prev + 1) % item.images.length;
          // console.log('Auto-playing to image:', next);
          return next;
        });
      }, 1500); // Faster auto-play for better UX
    } 
    
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isHovered, item.images]);

  // Navigation functions for modal
  const handlePreviousImage = () => {
    if (item.images && item.images.length > 1) {
      setModalImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
    }
  };

  const handleNextImage = () => {
    if (item.images && item.images.length > 1) {
      setModalImageIndex((prev) => (prev + 1) % item.images.length);
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Image clicked!', item.itemName || item.materialName);
    if (item.images && item.images.length > 0) {
      setModalImageIndex(currentImageIndex);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Reset zoom and pan when closing modal
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Zoom functionality
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 5)); // Max zoom 5x
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = prev / 1.5;
      if (newZoom < 1) {
        setPanPosition({ x: 0, y: 0 }); // Reset pan when zooming out to fit
        return 1;
      }
      return newZoom;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Pan functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        switch (e.key) {
          case '+':
          case '=':
            e.preventDefault();
            handleZoomIn();
            break;
          case '-':
            e.preventDefault();
            handleZoomOut();
            break;
          case '0':
            e.preventDefault();
            handleResetZoom();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            handlePreviousImage();
            break;
          case 'ArrowRight':
            e.preventDefault();
            handleNextImage();
            break;
          case 'Escape':
            handleModalClose();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Reset zoom when image changes
  useEffect(() => {
    if (isModalOpen) {
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [modalImageIndex, isModalOpen]);

  return (
    <Card
      className="item-card"
      onMouseEnter={() => {
        console.log('Mouse entered card:', item.itemName || item.materialName);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        console.log('Mouse left card:', item.itemName || item.materialName);
        setIsHovered(false);
      }}
    >
      {/* Jewelry Image Carousel */}
      <Box className={`jewelry-image ${(!item.images || item.images.length === 0) ? 'no-images' : ''}`}>
        {/* Actual Image Element for Better Centering */}
        {item.images && item.images.length > 0 ? (
          <Box
            className="image-container"
            onClick={handleImageClick}
          >
            <Box
              component="img"
              src={item.images[currentImageIndex]}
              alt={item.itemName || `${item.materialName} ${item.categoryName}`}
              className="image-element"
            />
          </Box>
        ) : null}
        {/* Show diamond icon only if no images */}
        {(!item.images || item.images.length === 0) && (
          <Box className="diamond-icon-container">
            <DiamondIcon className="diamond-icon" />
          </Box>
        )}

        {/* Auto-play indicator */}
        {isHovered && item.images && item.images.length > 1 && (
          <Box className="auto-play-indicator">
            <Box className="auto-play-dot" />
            Auto
          </Box>
        )}
        
        
        {/* Image indicators */}
        {item.images && item.images.length > 1 && (
          <Box 
            className="carousel-indicators"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            {item.images.map((_: any, index: number) => (
              <Box
                key={index}
                className={`indicator-dot ${currentImageIndex === index ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </Box>
        )}
        
        {/* Action Buttons */}
        {/* <Box
          className="action-buttons"
          sx={{
            position: "absolute",
            top: "16px",
            right: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            opacity: 0,
            transform: "translateY(-15px)",
            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          }}
        > */}
          {/* <IconButton
            size="small"
            sx={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(15px)",
              color: "#e91e63",
              borderRadius: "12px",
              width: "36px",
              height: "36px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              "&:hover": {
                background: "rgba(233, 30, 99, 0.1)",
                transform: "scale(1.1) rotate(5deg)",
                boxShadow: "0 6px 20px rgba(233, 30, 99, 0.2)"
              }
            }}
          >
            <FavoriteBorderIcon fontSize="small" />
          </IconButton> */}
          {/* <IconButton
            size="small"
            sx={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(15px)",
              color: "#ffc107",
              borderRadius: "12px",
              width: "36px",
              height: "36px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              "&:hover": {
                background: "rgba(255, 193, 7, 0.1)",
                transform: "scale(1.1) rotate(-5deg)",
                boxShadow: "0 6px 20px rgba(255, 193, 7, 0.2)"
              }
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton> */}
        {/* </Box> */}
      </Box>

      <CardContent className="card-content">
        {/* Title */}
        <Typography 
          variant="h6" 
          className="item-title"
        >
          {item.itemName || `${item.materialName} ${item.categoryName}`}
        </Typography>
        
        {/* Description */}
        <Typography 
          variant="body2" 
          className="item-description"
        >
          {item.description || `Exquisite ${item.materialName.toLowerCase()} ${item.categoryName.toLowerCase()} crafted with precision`}
        </Typography>
        
        {/* Details */}
        <Box className="details-container">
          <Box className="detail-row">
            <Typography variant="body2" className="detail-label">
              Purity
            </Typography>
            <Chip 
              label={item.purity} 
              size="small" 
              className="purity-chip"
            />
          </Box>
          
          <Box className="detail-row">
            <Typography variant="body2" className="detail-label">
              Weight
            </Typography>
            <Typography variant="body2" className="detail-value">
              {item.weight}g
            </Typography>
          </Box>
        </Box>
        
          </CardContent>

          {/* Image Modal */}
          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "& .MuiBackdrop-root": {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                backdropFilter: "blur(10px)",
              }
            }}
          >
            <Box
              className="modal-container"
              onWheel={handleWheel}
            >
              {/* Close Button */}
              <IconButton
                onClick={handleModalClose}
                className="modal-close-button"
              >
                <CloseIcon />
              </IconButton>

              {/* Zoom Controls */}
              <Box className="modal-zoom-controls">
                <Tooltip title="Zoom In (+)" placement="bottom">
                  <IconButton
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 5}
                    className="modal-zoom-button"
                  >
                    <ZoomInIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Zoom Out (-)" placement="bottom">
                  <IconButton
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1}
                    className="modal-zoom-button"
                  >
                    <ZoomOutIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Reset Zoom (0)" placement="bottom">
                  <IconButton
                    onClick={handleResetZoom}
                    disabled={zoomLevel === 1}
                    className="modal-zoom-button"
                  >
                    <RotateLeftIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Zoom Level Indicator */}
              <Box className="modal-zoom-level">
                {Math.round(zoomLevel * 100)}%
              </Box>

              {/* Left Navigation Arrow */}
              {item.images && item.images.length > 1 && (
                <IconButton
                  onClick={handlePreviousImage}
                  className="modal-nav-arrow left"
                >
                  <ChevronLeftIcon />
                </IconButton>
              )}

              {/* Right Navigation Arrow */}
              {item.images && item.images.length > 1 && (
                <IconButton
                  onClick={handleNextImage}
                  className="modal-nav-arrow right"
                >
                  <ChevronRightIcon />
                </IconButton>
              )}

              {/* Large Image with Zoom and Pan */}
              {item.images && item.images.length > 0 && (
                <Box
                  ref={imageRef}
                  component="img"
                  src={item.images[modalImageIndex]}
                  alt={item.itemName || `${item.materialName} ${item.categoryName}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className={`modal-image ${zoomLevel > 1 ? 'zoomable' : ''}`}
                  style={{
                    transition: zoomLevel === 1 ? "all 0.3s ease" : "none",
                    transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                    cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default",
                  }}
                />
              )}

              {/* Modal Indicators */}
              {item.images && item.images.length > 1 && (
                <Box className="modal-indicators">
                  {item.images.map((_: any, index: number) => (
                    <Box
                      key={index}
                      onClick={() => setModalImageIndex(index)}
                      className={`modal-indicator-dot ${modalImageIndex === index ? 'active' : ''}`}
                    />
                  ))}
                </Box>
              )}

              {/* Image Counter */}
              {item.images && item.images.length > 1 && (
                <Box className="image-counter">
                  {modalImageIndex + 1} / {item.images.length}
                </Box>
              )}
            </Box>
          </Modal>
        </Card>
      );
    };

    export default ItemCard;
