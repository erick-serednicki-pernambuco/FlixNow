import { useState } from "react";
import "./Login.css";
import FundoHome from "../../components/fundoHome/FundoHome";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";

export default function RecuperarSenha() {
  const [isEditing, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLoginTrue = () => {
    setIsLogin(true);
    navigate(`/login`);
  };

  const handleCancelLogin = () => {
    setIsLogin(false);
    navigate(`/login`);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    switch (name) {
      
      case 'email':
        setEmail(value);
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
        Recuperar Senha
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
         
         
          <div className="profile-form-buttons">
            <button onClick={handleLoginTrue}>Cancelar</button>
            <button onClick={handleCancelLogin}>Recuperar Senha</button>
          </div>
        </div>
      ) : (
        <div className="profile-details">
         
          <p>
            <strong>E-mail:</strong> {email}
          </p>
          
          
        </div>
      )}
    </div>
      </>
  );
}