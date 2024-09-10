import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login: any = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === "mugdha@abc.com" && password === "12341234") {
      console.log("Login successful!");
      navigate("/dashboard"); 
    } 
    else {
      alert("Invalid credentials. Please try again");
    }
  };

  return (
    <>
    <Container>
      <div className = "dfree-logo">
        <Logo src = "src/assets/Dfree.png" alt="Dfree-logo" />
      </div>
      <br />
      <div className = "wrapper">
        <div className="wrapper-left">
        <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
               <strong><label htmlFor="email">Email</label></strong>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <br />
            <div>
              <div>
                <strong><label htmlFor="password">Password </label></strong>
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </div>
            <br />
            <br />
            <button type="submit">Login</button>
          </form>
          </div>
          <div className="wrapper-right">
            <img src="src/assets/login.jpg" alt="Login-Image" />
          </div>
      </div>
    </Container>
    </>
  );
};

const Logo = styled.img`
width: 200px; 
height: auto; 
`

const Container = styled.div`
background-color: #013D51;
width : 100vw;
height : 100vh;
overflow : hidden;
display : flex;
flex-direction: column;
justify-content : center;
align-items: center;
h1{
  font-family: "Noto Sans", sans-serif;
  text-align : center;
}
.dfree-logo{
  position: absolute;
  top : 10%;
}
.wrapper{
  background-color : white;
  width : 50%;
  height : 50%;
  border-radius: 10px;
  padding : 10px;
  box-shadow: 20px 20px 20px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
}
.wrapper-left{
  flex : 1;
  padding : 10px;
  margin : 20px;
}
.wrapper-right{
  flex : 1;
  padding : 10px;
}
.wrapper-right img {
  max-width: 100%; 
  max-height: 100%; 
  border-radius: 10px; 
}
label{
  font-family: "Noto Sans", sans-serif;
  font-size : 20px;
}
input{
  padding : 15px;
  width : 80%;
  border-radius: 5px;
  outline: none;
  border: 1px solid #696969;
}
button{
  background-color: #013D51;
  color : white;
  width : 88%;
  padding: 15px;
  border-radius: 5px;
}
`

export default Login;

