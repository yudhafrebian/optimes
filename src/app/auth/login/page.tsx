import LoginForm from "@/form/LoginForm";
import { Button, Card, CardContent, Grid } from "@mui/material";

const LoginPage = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
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
