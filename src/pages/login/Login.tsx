import { useState } from "react";
import "./Login.css";
import FundoHome from "../../components/fundoHome/FundoHome";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";

export default function Login() {
  const [isEditing, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLoginTrue = () => {
    setIsLogin(true);
    navigate(`/inicio`);
  };

  const handleRecuperarSenha = () => {
    setIsLogin(false);
    navigate(`/recuperar`);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    switch (name) {
      
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <FundoHome />
     
    <div className="profile">
    <h1>
        Login
      </h1>
      {!isEditing ? (
        <div className="profile-form">
          <input
            placeholder="E-mail"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <input
            placeholder="Senha"
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
         
          <div className="profile-form-buttons">
            <button onClick={handleLoginTrue}>Login</button>
            <button onClick={handleRecuperarSenha}>Recuperar Senha</button>
          </div>
        </div>
      ) : (
        <div className="profile-details">
         
          <p>
            <strong>E-mail:</strong> {email}
          </p>
          <p>
            <strong>Password:</strong> {password}
          </p>
          
        </div>
      )}
    </div>
      </>
  );
}