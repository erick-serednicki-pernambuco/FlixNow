import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

export default function Layout(props: any) {
  return (
    <>
      <Navbar estadoPerfil={props.estadoPerfil} onnPerfil={props.onPerfil} onLogout={props.onLogout}/>
      <Outlet />
    </>
  );
}
