import React from "react";
import {
  Pagination,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

interface CommonPaginationProps {
  totalPages: number; // total number of pages
  currentPage: number; // current page (1-based)
  onPageChange: (page: number) => void;
  rowsPerPage?: number; // optional if you want a selector
  onRowsPerPageChange?: (rows: number) => void;
  rowsPerPageOptions?: number[]; // optional list of options
  showRowsPerPage?: boolean; // whether to show the rows selector
  siblingCount?: number; // for MUI Pagination
  boundaryCount?: number; // for MUI Pagination
}

const CommonPagination: React.FC<CommonPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
  showRowsPerPage = false,
  siblingCount = 1,
  boundaryCount = 1,
}) => {
  const handlePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  const handleRowsChange = (event: any) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange(event.target.value as number);
    }
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="flex-end"
      sx={{ mt: 2 }}
    >
      {showRowsPerPage && onRowsPerPageChange && (
        <FormControl size="small">
          <InputLabel id="rows-per-page-label">Rows per page</InputLabel>
          <Select
            labelId="rows-per-page-label"
            value={rowsPerPage}
            label="Rows per page"
            onChange={handleRowsChange}
          >
            {rowsPerPageOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Box>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePage}
          siblingCount={siblingCount}
          boundaryCount={boundaryCount}
          color="primary"
        />
      </Box>
    </Stack>
  );
};

export default CommonPagination;
