import { NavLink, useNavigate } from "react-router-dom"
import { menuItem } from "./menuItem"
import styled from "styled-components"
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { ChangeEvent } from 'react';

const Sidebar = () => {

  const navigate = useNavigate();
  const [subnav , setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  const [editablePhoto, setEditablePhoto] = useState("https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg");
  const [editableUsername, setEditableUsername] = useState("Person");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditablePhoto(event.target.value);
  };

  const handleUsernameChange = (event : ChangeEvent<HTMLInputElement>) => {
    setEditableUsername(event.target.value);
  };

  const toggleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const saveProfileChanges = () => {
    setIsEditingProfile(false);
  };

  const handleSignOut = () => {
    navigate('/')
  }

   
  return (
    
    <>
    <Bottom>
       <Profile>
          {!isEditingProfile ? (
            <>
              <Img src={editablePhoto} />
              <ProfileName>{editableUsername}</ProfileName>
            </>
          ) : (
            <>
              <EditProfileForm>
                <InputField
                  type="text"
                  value={editablePhoto}
                  onChange={handlePhotoChange}
                  placeholder="Enter photo URL"
                />
                <InputField
                  type="text"
                  value={editableUsername}
                  onChange={handleUsernameChange}
                  placeholder="Enter username"
                />
                <SaveButton onClick={saveProfileChanges}>Save</SaveButton>
              </EditProfileForm>
            </>
          )}
          <EditProfileButton onClick={toggleEditProfile}>
            {isEditingProfile ? "Cancel" : "Edit Profile"}
          </EditProfileButton>
        </Profile>
      <Area>
        {menuItem.map((item , index) => (
        <div className = "Main">
          <StyledNavLink to = {item.path} key = {index} onClick = {item.subNav && showSubnav}>
            <div className = "contents">
              <Icon>{item.icon}</Icon>   
              <Name>{item.name}</Name>   
            </div>
            <div className = "arrow">
              {item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null}
            </div>
          </StyledNavLink>
          {subnav && item.subNav && item.subNav.map((item , index) => {
            return(
            <DropdownLink to = {item.path} key = {index}>
              <span className = "dropdown-icon">{item.icon}</span>
              <StyledNavLink to = {item.path}><span className = "subnav">{item.name}</span></StyledNavLink>
            </DropdownLink>
            )
          })}
          <Line />
        </div> 
        ))}      
      </Area>
      <button type="submit" className = "btn">
        <span className = "value" onClick = {handleSignOut}>SIGN OUT</span>
        <FaPowerOff className = "sign_out"/>
      </button>
    </Bottom>
    </>
  )
}

const EditProfileButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left : 30%;
  background-color: #2283eb;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
`

const EditProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputField = styled.input`
  width: 80%;
  padding: 8px;
  margin-bottom: 10px;
  margin-top : 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
`

const DropdownLink = styled(NavLink)`
display: flex;
text-decoration: none;
color: black;
padding-left : 25%;
@media (max-width: 600px){
      display : block;
}
.dropdown-icon{
  position: relative;
  top : 20px;
  @media (max-width: 600px){
      top : 5px;
}
}
`

const Bottom = styled.div`
width : 13vw;
height : 100vh;
position : fixed;
top : 0;
left : 0;
background-color : #CBCED6;
border-radius: 10px;
.btn{
  position: fixed;
  bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border :none;
  outline : none;
  margin-left : 4rem;
  cursor : pointer;
  @media (max-width : 1200px){
    margin-left : 2rem;
  }
  @media (max-width : 900px){
    margin-left : 1rem;
    padding : 5px;
  }
  @media (max-width : 600px){
   margin-left : 20px;
  }
  @media (max-width : 400px){
   margin-left : 12px;
  }
}
.value{
  @media (max-width : 600px){
    display  : none ;
    }
}
.sign_out{
  padding-left : 5px;
  color : red;
  @media (max-width : 600px){
    padding : unset;
  }
}
`

const Profile = styled.div`
background-color: #F5F5FD;
border-radius: 10px;
`

const ProfileName = styled.h3`
text-align : center;
@media (max-width : 480px){
  display : none;
}
`

const StyledNavLink = styled(NavLink)`
display : flex;
color: black;
text-decoration: none;
margin: 20px 5px;
@media (max-width : 900px){
    margin: 10px 5px;
}
.subnav{
  @media (max-width : 600px){
    display: none;
  }
}

&:hover{
    background-color: #d9dee2;
} 
.contents{
  display: flex;
  align-items: center; 
}
.arrow{
  padding-left: 10px;
  @media (max-width : 600px){
  padding-right: unset;
  }
}
`

const Area = styled.div`
margin: 20px;
@media (max-width : 600px){
    margin-left : 25%;
}
`

const Line = styled.hr`
width : 80%;
`

const Icon = styled.div`
padding-right: 30px;
@media (max-width : 600px){
  padding-right: 10px;
}
`

const Name = styled.div`
font-family: "Noto Sans", sans-serif;
font-size : larger;
@media (max-width : 900px){
    font-size : smaller ;
    display: flex;
    justify-content: space-between;
}
@media (max-width : 600px){
    display  : none ;
}
` 

const Img = styled.img`
width: 50%;
height : 50%;
border-radius: 50%;
margin: 15%  25% 0 25%;
@media (max-width : 480px){
  margin-bottom: 25%;
}
`

export default Sidebar