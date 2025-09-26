import React from 'react';
import { Box, Chip, Toolbar } from '@mui/material';

interface ChipsetProps {
  chips: string[];
  selected?: string;
  onSelect: (chip: string) => void;
}

const Chipset: React.FC<ChipsetProps> = ({ chips, selected, onSelect }) => {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,           // attach to top (underneath AppBar)
        zIndex: (theme) => theme.zIndex.appBar, 
        bgcolor: (theme) => theme.palette.background.paper,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Toolbar component gives same height/padding as Toolbar so things align well */}
      <Toolbar variant="dense" sx={{ minHeight: (theme) => theme.mixins.toolbar.minHeight }}>
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
          {chips.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              variant={selected === chip ? 'filled' : 'outlined'}
              color={selected === chip ? 'primary' : 'default'}
              clickable
              onClick={() => onSelect(chip)}
            />
          ))}
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Chipset;
