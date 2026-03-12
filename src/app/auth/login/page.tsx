import LoginForm from "@/form/LoginForm";
import { Box, Card, CardContent, Grid, Paper } from "@mui/material";

const LoginPage = () => {
  return (
    // <Box sx={{ display: "flex" }}>
    //   <Box sx={{bgcolor: "primary.main"}}>

    //   </Box>
    //   <Box>
    //     <LoginForm />
    //   </Box>
    // </Box>
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      {/* <Paper
        variant="outlined"
        sx={{
          padding: 2,
          minWidth: 300,
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <LoginForm />
      </Paper> */}
      <Card
        sx={{
          padding: 2,
          minWidth: 300,
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LoginPage;
