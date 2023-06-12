import "./Perfil.css";
import { useState } from "react";
import "./Perfil.css";
import FundoHome from "../../components/fundoHome/FundoHome";
import Navbar2 from "../../components/navbar/Navbar";

export default function Perfil(props: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('********');
  const [profileType, setProfileType] = useState('user');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleCancelEditProfile = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'profileType':
        setProfileType(value);
        break;
      case 'profileImage':
        setProfileImage(value);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Navbar2
      />
      <FundoHome />
      <div style={{ height: "90vh" }} className="profile">
        <div className="profile-header">
          <img src={profileImage} alt="Profile" />
          <h1>
            {firstName} {lastName}
          </h1>
        </div>
        {isEditing ? (
          <div className="profile-form">
            <input
              placeholder="Nome"
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
            />
            <input
              placeholder="Segundo nome"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
            />
            <input
              placeholder="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              placeholder="Senha"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <select
              title="Tipo perfil"
              placeholder="Tipo perfil"
              name="profileType"
              value={profileType}
              onChange={handleInputChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input
              placeholder="Image URL"
              type="text"
              name="profileImage"
              value={profileImage}
              onChange={handleInputChange}
            />
            <div className="profile-form-buttons">
              <button onClick={handleSaveProfile}>Save</button>
              <button onClick={handleCancelEditProfile}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="profile-details">
            <p>
              <strong>Name:</strong> {firstName} {lastName}
            </p>
            <p>
              <strong>E-mail:</strong> {email}
            </p>
            <p>
              <strong>Password:</strong> {password}
            </p>
            <p>
              <strong>Type profile:</strong> {profileType}
            </p>
            <button onClick={handleEditProfile}>Edit profile</button>
          </div>
        )}
      </div>
    </>
  );
}