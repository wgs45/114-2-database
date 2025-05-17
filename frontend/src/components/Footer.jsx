import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  Divider,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        py: 6,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Online Ordering System. All rights
            reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link
              href="#"
              underline="hover"
              color="text.secondary"
              sx={{
                transition: "all 0.4s ease-in-out",
                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              underline="hover"
              color="text.secondary"
              sx={{
                transition: "all 0.4s ease-in-out",
                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              underline="hover"
              color="text.secondary"
              sx={{
                transition: "all 0.4s ease-in-out",
                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            >
              Contact
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
