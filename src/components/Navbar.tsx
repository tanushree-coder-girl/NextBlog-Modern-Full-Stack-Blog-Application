"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Service", href: "/service" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          NextBlog
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition ${
                  isActive
                    ? "text-green-600 font-semibold"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Avatar
                onClick={handleAvatarClick}
                sx={{
                  cursor: "pointer",
                  bgcolor: "#16a34a",
                  width: 36,
                  height: 36,
                  fontSize: "1rem",
                }}
              >
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={() => router.push("/login")}
              className="!text-green-600 !border-green-600 hover:!bg-green-50 rounded-full text-sm px-5"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <IconButton onClick={toggleMobileMenu}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu}>
        <div className="w-64 p-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-green-600">Menu</span>
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon />
            </IconButton>
          </div>
          <List>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.name}
                onClick={() => {
                  router.push(link.href);
                  toggleMobileMenu();
                }}
              >
                <ListItemText
                  primary={link.name}
                  primaryTypographyProps={{
                    className:
                      pathname === link.href
                        ? "text-green-600 font-semibold"
                        : "text-gray-700",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
          <div className="mt-4">
            {isAuthenticated ? (
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                color="success"
                onClick={() => {
                  router.push("/login");
                  toggleMobileMenu();
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
}
