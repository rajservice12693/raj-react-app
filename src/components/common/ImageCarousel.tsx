import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight, Circle } from '@mui/icons-material';

interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  height?: string | number;
  overlayText?: {
    title: string;
    subtitle: string;
    description?: string;
  } | undefined;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true,
  height = '70vh',
  overlayText
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: height,
        overflow: 'hidden',
        borderRadius: 0,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        '&:hover .carousel-arrow': {
          opacity: 1,
        },
      }}
    >
      {/* Main Image Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              minWidth: '100%',
              height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              '&::before': overlayText ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)',
                zIndex: 1,
              } : {},
            }}
          />
        ))}
      </Box>

      {/* Overlay Text */}
      {overlayText && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            zIndex: 3,
            maxWidth: '800px',
            px: 3,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              fontWeight: 300,
              letterSpacing: '0.1em',
              mb: 2,
              textTransform: 'uppercase',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {overlayText.title}
          </Typography>
          
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem' },
              fontWeight: 400,
              letterSpacing: '0.02em',
              background: 'linear-gradient(135deg, #d4af37 0%, #ffc107 25%, #ff8f00 50%, #d4af37 75%, #b8860b 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 8px rgba(212, 175, 55, 0.3)',
              mb: 2,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                borderRadius: '1px',
              }
            }}
          >
            {overlayText.subtitle}
          </Typography>
          
          {overlayText.description && (
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                fontWeight: 300,
                letterSpacing: '0.05em',
                lineHeight: 1.6,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                mt: 2,
              }}
            >
              {overlayText.description}
            </Typography>
          )}
          
          {/* Decorative Elements */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 4,
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
              }}
            />
            <Box
              sx={{
                width: '8px',
                height: '8px',
                background: 'linear-gradient(135deg, #d4af37, #ffc107)',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
              }}
            />
            <Box
              sx={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
              }}
            />
          </Box>
        </Box>
      )}

      {/* Navigation Arrows - Only show if height is sufficient */}
      {showArrows && images.length > 1 && (typeof height === 'number' ? height > 100 : (typeof height === 'string' && (!height.includes('px') ? parseInt(height) > 100 : parseInt(height.replace('px', '')) > 100))) && (
        <>
          <IconButton
            className="carousel-arrow"
            onClick={goToPrevious}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#d4af37',
              zIndex: 4,
              opacity: 0,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'translateY(-50%) scale(1.1)',
              },
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            <ChevronLeft sx={{ fontSize: 28 }} />
          </IconButton>
          
          <IconButton
            className="carousel-arrow"
            onClick={goToNext}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#d4af37',
              zIndex: 4,
              opacity: 0,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transform: 'translateY(-50%) scale(1.1)',
              },
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            <ChevronRight sx={{ fontSize: 28 }} />
          </IconButton>
        </>
      )}

      {/* Indicators - Only show if height is sufficient */}
      {showIndicators && images.length > 1 && (typeof height === 'number' ? height > 100 : (typeof height === 'string' && (!height.includes('px') ? parseInt(height) > 100 : parseInt(height.replace('px', '')) > 100))) && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 4,
          }}
        >
          {images.map((_, index) => (
            <IconButton
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                p: 0.5,
                color: currentIndex === index ? '#d4af37' : 'rgba(255, 255, 255, 0.6)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#d4af37',
                  transform: 'scale(1.2)',
                },
              }}
            >
              <Circle
                sx={{
                  fontSize: currentIndex === index ? 12 : 8,
                  transition: 'all 0.3s ease',
                }}
              />
            </IconButton>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ImageCarousel;
