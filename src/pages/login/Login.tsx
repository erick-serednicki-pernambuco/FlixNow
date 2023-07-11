import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import "./Login.css";
import FundoHome from "../../components/fundoHome/FundoHome";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AuthContext from '../../services/AuthContext';

interface LoginData {
  email: string;
  senha: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [errorLogin, setErrorLogin] = useState("");

  const validaEmail = {
    required: {
      value: true,
      message: 'Email é obrigatório',
    },
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: 'Email inválido',
    }
  };

  const validaSenha = {
    required: {
      value: true,
      message: 'Senha é obrigatória',
    },
    minLength: {
      value: 8,
      message: 'Senha deve ter no mínimo 8 caracteres',
    }
  };

  async function onSubmit(data: LoginData) {
    const { email, senha } = data;

    setErrorLogin("");

    try {
      await handleLogin(email, senha);
      navigate("/inicio");
    } catch (error) {
      if (error instanceof Error) {
        setErrorLogin("Erro de login, email ou senha inválido");
      }
    }
  }

  const handleRecuperarSenha = () => {
    navigate(`/recuperar`);
  };

  return (
    <>
      <FundoHome />
      <div className="profile">
        <h1>Login</h1>
        <div className="profile-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorLogin && <p className="erro">{errorLogin}</p>}
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" {...register("email", validaEmail)} />
              {errors.email && <p className="erro">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" {...register("senha", validaSenha)} />
              {errors.senha && <p className="erro">{errors.senha.message}</p>}
            </div>
            
            <div className="profile-form-buttons">
            <button type="submit">Entrar</button>
            <button onClick={handleRecuperarSenha}>Recuperar Senha</button>
          </div>
          </form>
         
        </div>
      </div>
    </>
  );
}