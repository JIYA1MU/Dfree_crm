import styled from "styled-components";
import { useState } from "react";

const program = [
    { label: 'Select any value', value: '' },
    {  label : 'Internship', value : 'Internship'},
    {  label : 'Fulltime', value : 'Fulltime'},
]

const department = [
    { label: 'Select any value', value: '' },
    { label : 'Sales' , value : 'Sales'},
    { label : 'Marketing' , value : 'Marketing'},
    { label : 'Operations' , value : 'Operations'},
    { label : 'HR' , value : 'HR'},
    { label : 'Accounts' , value : 'Accounts'},
]

const status= [{ label: 'Select any value', value: '' },
    { label : 'Active' , value : 'Active'},
    { label : 'Blacklist' , value : 'Blacklist'},
    { label : 'Resigned' , value : 'Resigned'},   
]

interface Employee {
    name : string;
    id : string;
    joiningDate : any;
    contactNumber : string;
    personalEmail : string;
    officialEmail : string;
    address : string;
    position : string;
    alternateContact_1 : string;
    alternateContact_2 : string;
    program ?: string;
    department ?: string;
    status ?: string;
    resigned_date ?: any;
}

const EmployeeForm = () => {

    const initialFormData: Employee = {
        name: '',
        id: '',
        joiningDate: null,
        contactNumber: '',
        personalEmail: '',
        officialEmail: '',
        address: '',
        position: '',
        alternateContact_1: '',
        alternateContact_2: '',
        program: '',
        department: '',
        status: '',
        resigned_date: null,
    };

    const [formData, setFormData] = useState<Employee>(initialFormData);
 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
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

    return (
        <>
        <h1 style = {{textAlign:  "center" }}>Add New Employee</h1>
        <hr />
        <form onSubmit={handleSubmit}>
            <Form>
                <FormElement>
                    <div>
                        <span>
                            <label htmlFor="name" >Employee Name: </label>
                        </span>
                        <div >
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Enter Your Username"
                                value={formData.name} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="joiningDate" >Joining Date: </label>
                        </span>
                        <div>
                            <input 
                                type = "date" 
                                name = "joiningDate" 
                                value = {formData.joiningDate}
                                onChange = {handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="officialEmail">Official Email Address: </label>
                        </span>
                        <div>
                            <input 
                                type="email"
                                name="officialEmail" 
                                placeholder="Enter your Official Email Address"
                                value={formData.officialEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="personalEmail">Personal Email Address: </label>
                        </span>
                        <div>
                            <input 
                                type="email"
                                name="personalEmail" 
                                placeholder="Enter your Personal Email Address"
                                value={formData.personalEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="position" >Position: </label>
                        </span>
                        <div >
                            <input 
                                type="text" 
                                name="position"
                                placeholder="Enter Your Position"
                                value={formData.position} 
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="program">Internship / Fulltime :</label>
                        </span>
                        <div>
                            <select name="program" value={formData.program} onChange={handleChange}>
                                {program.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="department">Department:</label>
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
                <FormElement>
                    <div>
                        <span>
                            <label htmlFor="id" >Employee Id: </label>
                        </span>
                        <div>
                            <input 
                                type = "text" 
                                name = "id" 
                                placeholder = "Enter Employee ID"
                                value = {formData.id}
                                onChange = {handleChange}
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
                            <label htmlFor="Address">Address: </label>
                        </span>
                        <div>
                            <input 
                                    type="text"
                                    name="address" 
                                    placeholder="Enter your Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="alternateContact_1" >Alternate Contact 1: </label>
                        </span>
                        <div>
                            <input 
                                type = "text" 
                                name = "alternateContact_1" 
                                placeholder = "Enter Alternate Contact 1"
                                maxLength = {10}
                                value = {formData.alternateContact_1}
                                onChange = {handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="alternateContact_2" >Alternate Contact 2: </label>
                        </span>
                        <div>
                            <input 
                                type = "text" 
                                name = "alternateContact_2" 
                                placeholder = "Enter Alternate Contact 2"
                                maxLength = {10}
                                value = {formData.alternateContact_2}
                                onChange = {handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    
                    <div>
                        <span>
                            <label htmlFor="status">Current Status: </label>
                        </span>
                        <div>
                            <select name="status" value={formData.status} onChange={handleChange}>
                                {status.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <br />
                    <div>
                        {formData.status === "Resigned" && (
                            <div >
                                <span>
                                    <label htmlFor="resigned_date">Resigned Date: </label>
                                </span>
                                <div>
                                    <input 
                                        type="date" 
                                        name="resigned_date" 
                                        value={formData.resigned_date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <br />
                </FormElement>
            </Form>
            <hr />
            <Button>
            <button type="reset" className="reset" onClick = {handleReset}>Reset</button>
            <button type="submit" className ="submit" >Submit</button>
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
    outline : none;
    width : 220px;
    height : 40px;
    background-color: #7A5CFA;
    color : white;
    border : 1px solid gray;
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

export default EmployeeForm;