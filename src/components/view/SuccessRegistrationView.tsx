import { useSnackbar } from "@/hooks/useSnackbar";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";

const SuccessRegistrationView = ({ data, onClose }: { data: any, onClose: () => void }) => {
    const showSnackbar = useSnackbar();

    const handleCopyPassword = () => {
      navigator.clipboard.writeText(data.password);
      showSnackbar("Password copied to clipboard!");
    }
  return (
    <Box>
      <Typography variant="body2">Username: <strong>{data.username}</strong></Typography>
      <Typography variant="body2">Full Name: <strong>{data.full_name}</strong></Typography>
      
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
        <Button fullWidth variant="outlined" onClick={handleCopyPassword}>
          Copy Password
        </Button>
        <Button fullWidth variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default SuccessRegistrationView;