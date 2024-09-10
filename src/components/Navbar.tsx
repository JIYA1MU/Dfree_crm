import styled from 'styled-components';
import { AiOutlineSearch, AiOutlineBell } from 'react-icons/ai';


const Navbar = () => (
  <StyledNavbar>
    <div className = "Container">
      <input className = "styledInput" type="search" name="search" placeholder = "Search" />
      <Search_icon />
    </div>
    <div className = "Container">
      <Bell  />
    </div>
  </StyledNavbar>
);

const Search_icon = styled(AiOutlineSearch)` 
margin-left: 10px;
cursor : pointer;
`

const Bell = styled(AiOutlineBell)`
margin : 20px;
`

const StyledNavbar = styled.div`
width: 85vw;
height: 60px;
background-color: #fffcfc; 
color: #333; 
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 20px;
position: fixed; 
top: 0;
left: 13vw;
border-radius: 0 0 10px 10px;
@media (max-width: 900px) {
  height: 30px;
}
.Container{
  display : flex;
  align-items: center;
}
.styledInput{
  padding: 10px;
border: 1px solid #ccc;
border-radius: 4px;
&::placeholder {
  color: #999; 
}
&:focus {
  outline: none;
  border-color: #999;
}
@media (max-width: 480px) {
  padding: 5px;}
}
`

export default Navbar;

