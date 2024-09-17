import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

type Navs = {
  label: string;
  route: string;
};
const NAVS: Navs[] = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Services",
    route: "/services",
  },
  {
    label: "Experience",
    route: "/experience",
  },
  {
    label: "Education",
    route: "/education",
  },
  {
    label: "Contact",
    route: "/contact",
  },
];

type NavButtonProps = Navs & {
  isCurrentPage: boolean;
};

const NavButton = ({ label, route, isCurrentPage }: NavButtonProps) => {
  return (
    <Button
      disableRipple
      LinkComponent={Link}
      href={route}
      sx={{
        textTransform: "none",
        width: "5.5rem",
        height: "1rem",
        padding: 0,
        backgroundColor: "inherit",
        ...(isCurrentPage
          ? {
              border: "2px solid #286F6C",
              borderTop: 0,
              borderBottom: 0,
              borderRadius: "8px",
            }
          : {}),
        color: "#286F6C",
        "&:hover": {
          ...(!isCurrentPage ? { color: "#EDB33C" } : { cursor: "default" }),
        },
      }}
    >
      {label}
    </Button>
  );
};

const NavBar = () => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      mt={5}
      mb={20}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="h5">Abdul-Mumeen</Typography>
      </Box>
      <Box display="flex" alignContent="center" gap={2} alignItems="center">
        {NAVS.map(({ label, route }, index) => (
          <NavButton
            key={label}
            label={label}
            route={route}
            isCurrentPage={index === 0}
          />
        ))}
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{
            width: "9.5rem",
            borderRadius: "5px",
            color: "#F8F7F1",
            backgroundColor: "#286F6C",
            textTransform: "none",
          }}
        >
          Download CV
        </Button>
      </Box>
    </Box>
  );
};

export default NavBar;
