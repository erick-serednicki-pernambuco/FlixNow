import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import "./Navbar.css";

export default function Navbar2(props: any) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileSize = useMediaQuery(
    "(max-width: 660px) and (max-height: 820px)"
  );
  const [showItems, setShowItems] = React.useState(!isMobileSize);
  const [profileMenuAnchor, setProfileMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const location = useLocation();
  const currentRoute = location.pathname; // Obter a rota atual

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setProfileMenuAnchor(null); // alteração aqui
  };

  const navigateBack = () => {
    navigate(-1); // Retorna à rota anterior
  };

  ////////////////////////////////////
  React.useEffect(() => {
    setShowItems(!isMobileSize);
  }, [isMobileSize]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigate = useNavigate();

  function navegarParaPerfil(event: any) {
    props.estadoPerfil(event);
    navigate("/perfil");
  }

  function handleClick(event: any) {
    props.onLogout(event);
    navigate("/login");
  }

  const menuItems = [
    { text: "Inicio", icon: <HomeIcon />, link: "/inicio" },
    
    {
      text: <p style={{ whiteSpace: "nowrap" }}>Minha lista</p>,
      icon: <PlaylistAddCheckIcon />,
      link: "/minha-lista",
    },
  ];

  if (drawerOpen) {
    menuItems.push({ text: "Sair", icon: <WhatshotIcon />, link: "/login" });
    menuItems.unshift({
      text: "Perfil",
      icon: <WhatshotIcon />,
      link: "/perfil",
    });
  }

  return (
    <AppBar>
      <Toolbar id="navbar">
        <Typography
          style={{ whiteSpace: "nowrap" }}
          id="logo"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          FLIX-NOW
        </Typography>

        {isSmallScreen ? (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <div id="lista">
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.link}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: showItems ? "block" : "none",
                  }}
                >
                  <Typography
                    style={{ display: "flex" }}
                    variant="subtitle1"
                    sx={{ marginRight: 4 }}
                  >
                    {item.text}
                  </Typography>
                </Link>
              ))}
            </div>
          </>
        )}

        {isSmallScreen ? (
          <SwipeableDrawer
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
          >
            <List>
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button onClick={handleDrawerToggle}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </SwipeableDrawer>
        ) : (
          ""
        )}

        {!isSmallScreen && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={profileMenuAnchor} // alteração aqui
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(profileMenuAnchor)} // alteração aqui
              onClose={handleClose}
            >
              {Boolean(profileMenuAnchor) && (
                <div>
                  {currentRoute !== "/perfil" &&
                  !currentRoute.includes("/detalhes/") ? (
                    <div>
                      <MenuItem key="perfil" onClick={navegarParaPerfil}>
                        Perfil
                      </MenuItem>
                      <MenuItem key="configuracoes" onClick={handleClose}>
                        Configurações
                      </MenuItem>
                      <MenuItem key="sair" onClick={handleClick}>
                        Sair
                      </MenuItem>
                    </div>
                  ) : (
                    <div>
                      <MenuItem key="voltar" onClick={navigateBack}>
                        Voltar
                      </MenuItem>
                    </div>
                  )}
                </div>
              )}
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

