
import { Box, Button, Typography } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Image
        src="/assets/404 Error Page not Found with people connecting a plug-rafiki.svg"
        alt="404"
        width={100}
        height={100}
        style={{ width: "100%", height: "auto" }}
      />
      <Typography variant="h4">404</Typography>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The page you are looking for does not exist.
        </Typography>
        <Link href="/">
          <Button variant="contained" startIcon={<BackIcon />}>
            Back to Home
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
