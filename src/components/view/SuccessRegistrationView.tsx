import { useSnackbar } from "@/hooks/useSnackbar";
import { Box, Button, Typography } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from "copy-to-clipboard";
import dayjs from "dayjs";

const SuccessRegistrationView = ({ data, onClose }: { data: any, onClose: () => void }) => {
    const showSnackbar = useSnackbar();

const handleCopyPassword = () => {
  if (data?.password) {
    const isCopySuccess = copy(data.password);
    if (isCopySuccess) {
      showSnackbar("Password copied to clipboard!", "success");
    } else {
      showSnackbar("Failed to copy", "error");
    }
  }
};
  return (
    <Box>
      <Typography variant="body2">Username: <strong>{data.username}</strong></Typography>
      <Typography variant="body2">Full Name: <strong>{data.full_name}</strong></Typography>
      <Typography variant="body2">Account Type: <strong>{data.account_type}</strong></Typography>
      <Typography variant="body2">Valid Until: <strong>{data.account_expiry_date ? dayjs(data.account_expiry_date).format('YYYY-MM-DD') : 'N/A'}</strong></Typography>
      <Typography variant="body2">Area: <strong>{data.area}</strong></Typography>
      <Typography variant="body2">Site: <strong>{data.site}</strong></Typography>

      
      <Box sx={{ 
        bgcolor: '#f5f5f5', 
        p: 2, 
        my: 2, 
        borderRadius: 2, 
        border: '1px dashed #ccc',
        textAlign: 'center' 
      }}>
        <Typography variant="caption" color="textSecondary">TEMPORARY PASSWORD</Typography>
        <Typography variant="h5" sx={{ letterSpacing: 2, fontWeight: 'bold', my: 1 }}>
          {data.password}
        </Typography>
        <Typography variant="caption" color="error">
          Expires at: {dayjs(data.password_expiry_date).format('YYYY-MM-DD HH:mm')}
        </Typography>
      </Box>

      <Typography variant="subtitle2" color="warning.main">⚠️ IMPORTANT INSTRUCTIONS:</Typography>
      <ul style={{ fontSize: '0.8rem', paddingLeft: '20px' }}>
        <li>Copy this password</li>
        <li>Give to user MANUALLY</li>
      </ul>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button fullWidth variant="outlined" color="error" onClick={onClose}>
          Close
        </Button>
        <Button fullWidth variant="contained" onClick={handleCopyPassword} startIcon={<ContentCopyIcon />}>
          Copy Password
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessRegistrationView;