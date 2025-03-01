"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Button,
  TextField,
  Typography,
  Box,
  Card,
  Fade,
  Grow,
  InputAdornment,
  CircularProgress,
  IconButton
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";

const GlassCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: "32px",
  width: "100%",
  maxWidth: 400,
});

interface AuthFormProps {
  type: "login" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      if (type === "signup") {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error);
        }

        router.push("/login");
      } else {
        const res = await fetch("/api/auth/callback/credentials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Login failed");
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)",
      }}
    >
      <Fade in timeout={800}>
        <GlassCard>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Poppins",
                fontWeight: 700,
                color: "#fff",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
              }}
            >
              Task Manager
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: "Space Grotesk", color: "#bbb", mt: 1 }}
            >
              {type === "login" ? "Welcome Back!" : "Create Your Account"}
            </Typography>
          </Box>

          <Grow in timeout={1000}>
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#fff" }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
              
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#fff" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: "#fff" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />

              {error && (
                <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  bgcolor: "#6200ea",
                  "&:hover": { bgcolor: "#7f39fb" },
                  borderRadius: "8px",
                  fontFamily: "Inter",
                  fontWeight: 700,
                }}
              >
                {loading ? <CircularProgress size={24} /> : type === "login" ? "Log In" : "Sign Up"}
              </Button>

              <Button
                sx={{
                  mt: 2,
                  color: "#fff",
                  "&:hover": { color: "#7f39fb" },
                  fontFamily: "Space Grotesk",
                }}
                onClick={() => router.push(type === "login" ? "/signup" : "/login")}
              >
                {type === "login" 
                  ? "New Here? Sign Up" 
                  : "Already have an account? Log In"}
              </Button>
            </Box>
          </Grow>
        </GlassCard>
      </Fade>
    </Box>
  );
}

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
    "&:hover fieldset": { borderColor: "#fff" },
  },
  "& .MuiInputLabel-root": { color: "#bbb", fontFamily: "Inter" },
};