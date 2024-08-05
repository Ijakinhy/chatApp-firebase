import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import logoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/ImageEl";
import { useState } from "react";

const initForm = {
  email: "",
  password: "",
};

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initForm);

  const authText = isLogin ? "Do not have account" : "Already  have account";

  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleAuth = async () => {};
  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10,
      }}
    >
      <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
        <ImageEl src={logoImg} alt="logo" />
        <Typography color="rgba(255,255,255,0.6)">
          Visualize Your Workflow for Increased Productivity. <br /> Access Your
          Tasks Anytime, Anywhere
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <TextField
          value={form.email}
          onChange={handleChange}
          name="email"
          label="Email"
        />
        <TextField
          value={form.password}
          onChange={handleChange}
          name="password"
          label="Password"
        />
        <Button
          disabled={!form.email.trim() || !form.password.trim()}
          size="large"
          variant="contained"
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </Stack>
      <Typography
        onClick={() => setIsLogin((state) => !state)}
        textAlign="center"
        mt={3}
        sx={{ cursor: "pointer" }}
      >
        {authText}
      </Typography>
    </Container>
  );
};

export default AuthScreen;
