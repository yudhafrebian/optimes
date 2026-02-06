import { useSnackbar } from "@/hooks/useSnackbar";
import { Box, Button, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "copy-to-clipboard";
import dayjs from "dayjs";
import { AccountCreateResponseDto } from "@/api-client";
import GenericChips from "../core/GenericChips";

const SuccessRegistrationView = ({
  data,
  onClose,
}: {
  data: AccountCreateResponseDto;
  onClose: () => void;
}) => {
  const showSnackbar = useSnackbar();

  const handleCopyPassword = () => {
    if (data?.initial_password) {
      const isCopySuccess = copy(data.initial_password);
      if (isCopySuccess) {
        showSnackbar("Password copied to clipboard!", "success");
      } else {
        showSnackbar("Failed to copy", "error");
      }
    }
  };
  return (
    <Box>
      <Typography variant="body2">
        Username: <strong>{data.account.username}</strong>
      </Typography>
      <Typography variant="body2">
        Full Name: <strong>{data.account.full_name}</strong>
      </Typography>
      <Typography variant="body2">
        Account Type: <strong>{data.account.account_type.label}</strong>
      </Typography>
      <Typography variant="body2">
        Valid Until:{" "}
        <strong>
          {data.account.account_expiry_date
            ? dayjs(data.account.account_expiry_date).format("YYYY-MM-DD")
            : "N/A"}
        </strong>
      </Typography>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography variant="body2">Role:</Typography>
        <GenericChips
          value={data.account.account_role?.label || ""}
          variant="filled"
        />
      </Box>

      <Box
        sx={{
          bgcolor: "#f5f5f5",
          p: 2,
          my: 2,
          borderRadius: 2,
          border: "1px dashed #ccc",
          textAlign: "center",
        }}
      >
        <Typography variant="caption" color="textSecondary">
          TEMPORARY PASSWORD
        </Typography>
        <Typography
          variant="h5"
          sx={{ letterSpacing: 2, fontWeight: "bold", my: 1 }}
        >
          {data.initial_password}
        </Typography>
        <Typography variant="caption" color="error">
          Expires at:{" "}
          {dayjs(data.account.password_expiry_time).format("YYYY-MM-DD HH:mm")}
        </Typography>
      </Box>

      <Typography variant="subtitle2" color="warning.main">
        ⚠️ IMPORTANT INSTRUCTIONS:
      </Typography>
      <ul style={{ fontSize: "0.8rem", paddingLeft: "20px" }}>
        <li>Copy this password</li>
        <li>Give to user MANUALLY</li>
        <li>
          User <b>MUST</b> change password on login
        </li>
      </ul>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button fullWidth variant="outlined" color="error" onClick={onClose}>
          Close
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleCopyPassword}
          startIcon={<ContentCopyIcon />}
        >
          Copy Password
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessRegistrationView;
