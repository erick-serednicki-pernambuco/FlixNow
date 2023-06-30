import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import "./Login.css";
import FundoHome from "../../components/fundoHome/FundoHome";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AuthContext from '../../services/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig';

interface RegistroData {
  email: string;
  senha: string;
}

export default function Registro() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistroData>();
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [errorRegistro, setErrorRegistro] = useState("");

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

  async function onSubmit(data: RegistroData) {
    const { email, senha } = data;

    setErrorRegistro("");

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      await handleLogin(email, senha);
      navigate("/inicio");
    } catch (error) {
      if(error instanceof Error)
      {throw new Error(error.message);}
    
    }
  }

  const handleLoginRedirect = () => {
    navigate(`/login`);
  };

  return (
    <>
      <FundoHome />
      <div className="profile">
        <h1>Registro</h1>
        <div className="profile-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            {errorRegistro && <p className="erro">{errorRegistro}</p>}
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
              <button type="submit">Registrar</button>
              <button onClick={handleLoginRedirect}>Voltar para o Login</button>
            </div>
          </form>
         
        </div>
      </div>
    </>
  );
}
