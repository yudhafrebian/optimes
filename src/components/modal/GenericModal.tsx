"use client";

import React from "react";
import {
  Box,
  Divider,
  Modal,
  Typography,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IGenericModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: number | string;
  showCloseButton?: boolean;
}

const GenericModal: React.FC<IGenericModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 500,
  showCloseButton = true,
}) => {
  // Mencegah modal tertutup saat klik area luar (backdrop)
  const handleClose = (_: any, reason: string) => {
    if (reason === "backdropClick") return;
    onClose();
  };

  const modalStyle: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Responsif untuk layar kecil
    maxWidth: maxWidth,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
    outline: "none",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="generic-modal-title"
      disableEscapeKeyDown
    >
      <Box sx={modalStyle}>
        {/* Header Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography id="generic-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          {showCloseButton && (
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Content Section */}
        <Box sx={{ mt: 1 }}>
            {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default GenericModal;