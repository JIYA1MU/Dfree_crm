import styled from "styled-components";
import { useState } from "react";

interface UserAuthorityOption {
  name: string;
  label : string;
}

interface User {
    firstName : string;
    lastName : string;
    userName : string;
    userId : string;
    password : string;
    role : string;
    contactNumber : string;
    email : string;
    userAuthority : string[];
    department : string;
}

const department = [
    { label: 'Select any value', value: '' },
    { label : 'Sales' , value : 'Sales'},
    { label : 'Marketing' , value : 'Marketing'},
    { label : 'Operations' , value : 'Operations'},
    { label : 'HR' , value : 'HR'},
    { label : 'Accounts' , value : 'Accounts'},
]

const userAuthority : any = [
    { name :'Lead' , label : 'Lead'},
    { name :'Cutomer', label : 'Customer'},
    { name :'Employee' , label : 'Employee'},
    { name :'Quotation' , label : 'Quotation'},
    { name :'Invoice' , label : 'Invoice'},
    { name :'User' , label : 'User'},
]

const UserForm = () => {
    const initialFormData : User = {
        firstName : '',
        lastName : '',
        userName : '',
        userId : '',
        password : '',
        role : '',
        contactNumber : '',
        email : '',
        userAuthority : [],
        department : ''
    }

    const [formData , setFormData] = useState<User>(initialFormData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        console.log(name , value)
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
    };

    const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleReset = () => {
        setFormData(initialFormData); 
    };

    const handleCheckboxChange = (name: string) => {
        const newSelectedOptions = [...formData.userAuthority]; 

        const index = newSelectedOptions.indexOf(name);
        if (index > -1) {
        newSelectedOptions.splice(index, 1); 
        } else {
        newSelectedOptions.push(name); 
        }

        setFormData((prevData) => ({
        ...prevData,
        userAuthority: newSelectedOptions,
        }));
    };


  return (
    <>
        <h1 style = {{textAlign:  "center" }}>Add New User</h1>
        <hr />
        <form onSubmit={handleSubmit}>
            <Form>
                <FormElement>
                    <div>
                        <span>
                            <label htmlFor="firstName" >First Name: </label>
                        </span>
                        <div >
                            <input 
                                type="text" 
                                name="firstName"
                                placeholder="Enter Your Username"
                                value={formData.firstName} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="userName" >User Name: </label>
                        </span>
                        <div >
                            <input 
                                type="text" 
                                name="userName"
                                placeholder="Enter Your Username"
                                value={formData.userName} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                     <div>
                        <span>
                            <label htmlFor="email">Email Address: </label>
                        </span>
                        <div>
                            <input 
                                type="email"
                                name="email" 
                                placeholder="Enter your Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="role" >Role: </label>
                        </span>
                        <div >
                            <input 
                                type="text" 
                                name="role"
                                placeholder="Enter Your Role"
                                value={formData.role} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor = "userAuthority">Authority: </label>
                        </span>
                        <div>
                            {userAuthority.map((option: UserAuthorityOption) => (
                                <div key={option.name}>
                                    <input
                                        type="checkbox"
                                        name={option.name} 
                                        className="checkbox"
                                        checked={formData.userAuthority.includes(option.name)} 
                                        onChange={() => handleCheckboxChange(option.name)}
                                    />
                                <label htmlFor={option.name}>{option.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </FormElement>
                <FormElement>
                    <div>
                        <span>
                            <label htmlFor="lastName" >Last Name: </label>
                        </span>
                        <div >
                            <input 
                                type="text" 
                                name="lastName"
                                placeholder="Enter Your Last name"
                                value={formData.lastName} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="password" >Password: </label>
                        </span>
                        <div >
                            <input 
                                type = "password" 
                                name = "password"
                                placeholder = "Enter Password"
                                value = {formData.password}
                                onChange = {handleChange}
                                required 
                                />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="userId" >User ID: </label>
                        </span>
                        <div >
                            <input 
                                type="text" 
                                name="userId"
                                placeholder="Enter User ID"
                                value={formData.userId} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="contactNumber" >Contact Number: </label>
                        </span>
                        <div>
                            <input 
                                type = "text" 
                                name = "contactNumber" 
                                placeholder = "Enter your Contact Number"
                                maxLength = {10}
                                value = {formData.contactNumber}
                                onChange = {handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="department">Department: </label>
                        </span>
                        <div>
                            <select name="department" value={formData.department} onChange={handleChange}>
                                {department.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <br />
                </FormElement>
            </Form>
            <hr />
            <Button>
            <button type="reset" className="reset" onClick = {handleReset}>Reset</button>
            <button type="submit" className ="submit">Submit</button>
            </Button>
        </form>
    </>
    );
};

const Form = styled.div`
    display : flex;
    justify-content: space-around;
`

const FormElement = styled.div`
padding: 20px;
border-radius: 10px;
.checkbox {
    width: 16px;
    accent-color : #7A5CFA; 
   
}
label{
    font-size : 14px;
    font-family : "Noto Sans", sans-serif;
}
.other{
    margin-top : 20px;
}
input , textarea{
    padding : 10px;
    border-radius: 5px;
    outline : none;
    width : 200px;
    height : 20px;
    border : 1px solid gray;
}
select{
    padding : 10px;
    border-radius: 5px;
    border : 1px solid gray;
    outline : none;
    width : 220px;
    height : 40px;
    background-color: #7A5CFA;
    color : white;
} 
option{
    background-color : white;
    color : black;
}
`

const Button = styled.div`
display : flex;
justify-content: center;
.submit{
    background-color: #7A5CFA;
    color : white;
    padding : 15px;
    margin : 10px;
    border : none;
    outline : none;
    border-radius: 5px;
    font-size : 600;
}
.reset{
    color : #7A5CFA;
    padding : 15px;
    margin : 10px;
    border-color : #7A5CFA;
    outline : none;
    border-radius: 5px;
    font-size : 600;
}
`

export default UserForm;