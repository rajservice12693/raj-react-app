import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

type ConfirmationDialogProps = {
  open: boolean;
  title?: React.ReactNode;
  content?: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  hideCancel?: boolean;
  hideConfirm?: boolean;
};

export const ConfirmationDialog = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  hideCancel = false,
  hideConfirm = false,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        {!hideCancel && (
          <Button onClick={onClose} color="secondary">
            {cancelText}
          </Button>
        )}
        {!hideConfirm && (
          <Button onClick={onConfirm} variant="contained" color="primary">
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
