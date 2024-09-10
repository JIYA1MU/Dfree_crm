import styled from "styled-components";
import { useState } from "react";
import axios from 'axios';

const dropdownOption = [
    { label: 'Select any value', value: '' },
    {  label : 'Student', value : 'Student'},
    {  label : 'Professor', value : 'Professor'},
    {  label : 'Business Owner',value : 'Business Owner'},
    {  label : "Other" , value : "other"}
]

const source_option = [
    { label: 'Select any value', value: '' },
    { label : 'Telegram' , value : 'Telegram'},
    { label : 'Linkedin' , value : 'Linkedin'},
    { label : 'Facebook' , value : 'Facebook'},
    { label : 'Instagram' , value : 'Instagram'},
    { label : 'Any Other' , value : 'anyother'},
    { label : 'Referred By' , value : 'ReferredBy'}
]

const connect= [
    { label: 'Select any value', value: '' },
    { label : 'Whatsapp' , value : 'Whatsapp'},
    { label : 'Email' , value : 'Email'},
    { label : 'Text' , value : 'Text'},
    { label : 'Call' , value : 'Call'},   
]

const services = [
    { label: 'Select any value', value: '' },
    { label : 'Academic Writing' , value : 'Academic Writing'},
    { label : 'Resume Writing' , value : 'Resume Writing'},
    { label : 'Cover Page / SOP Writing' , value : 'Cover Page / SOP Writing'},
    { label : 'E-tutorial' , value : 'E-tutorial'},
    { label : 'Web Designing' , value : 'Web Designing'},
    { label : 'SMM' , value : 'SMM'},
    { label : 'Content Writing' , value : 'Content Writing'},
    { label : 'Graphic Designing' , value : 'Graphic Designing'} 
]

const leadStatus = [
    { label: 'Select any value', value: '' },
    { label : 'Won' , value : 'Won'},
    { label : 'Pending' , value : 'Pending'},
    { label : 'Loss' , value : 'Loss'}
]

const pricing = [
    { label: 'Select any value', value: '' },
    { label : 'Pricing' , value : 'Pricing'},
    { label : 'Quotation' , value : 'Quotation'},
]

interface Lead {
    leadname : string;
    contactNumber : string;
    email : string;
    createdDate : any;
    owner : string;
    remarks : string;
    occupation ?: string;
    service ?: string;
    source ?: string;
    pricing ?: string;
    contactWithClient ?: string;
    leadStatus ?: string;
    other ? : string;
    anyother ?: string;
    ReferredBy ?: string;
}
interface LeadFormProps {
    onLeadAdded: (lead: Lead) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onLeadAdded }) => {
    const initialFormData: Lead = {
        leadname : '',
        contactNumber : '',
        email : '', 
        createdDate : null,
        owner : '',
        remarks : '',
        occupation : '',
        service : '',
        source : '',
        pricing : '',
        contactWithClient : '',
        leadStatus : '',
        other : '',
        anyother : '',
        ReferredBy : ''
    };


    const [formData, setFormData] = useState<Lead>(initialFormData);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/leads', formData);
          console.log('Lead added:', response.data);
          onLeadAdded(response.data);
          setFormData(initialFormData);
        } catch (error) {
          console.error('Error adding lead:', error);
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
    };

    return (
        <>
        <h1 style = {{textAlign:  "center" }}>Add New Lead</h1>
        <hr />
        <form onSubmit={handleSubmit}>
            <Form>
                <FormElement>
                    <div>
                        <span>
                            <label htmlFor="name" >Lead Name: </label>
                        </span>
                        <div >
                            <input 
                                type="text" 
                                name="leadname"
                                placeholder="Enter Your Username"
                                value={formData.leadname} 
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
                            <label htmlFor="owner">Owner: </label>
                        </span>
                        <div>
                            <input 
                                type="text"
                                name="owner" 
                                placeholder="Enter Owner"
                                value={formData.owner}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="occupation">Occupation :</label>
                        </span>
                        <div>
                            <select name="occupation" value={formData.occupation} onChange={handleChange}>
                                {dropdownOption.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        {formData.occupation === "other" && (
                            <div className = "other">
                                <span>
                                    <label htmlFor="other">Other: </label>
                                </span>
                                <div>
                                    <input 
                                        type="text" 
                                        name="other" 
                                        placeholder="Enter Other Value"
                                        value={formData.other}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="sources">Sources :</label>
                        </span>
                        <div>
                            <select name="source" value={formData.source} onChange={handleChange}>
                           {source_option.map((option) => (
                              <option key={option.value} value={option.value}>
                              {option.label}
                         </option>
    ))}
</select>
                        </div>
                    </div>
                    <div>
                        {formData.source === "anyother" && (
                            <div className = "other">
                                <span>
                                    <label htmlFor="anyother">Any Other: </label>
                                </span>
                                <div>
                                    <input 
                                        type="text" 
                                        name="anyother" 
                                        placeholder="Enter Other Value"
                                        value={formData.anyother}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        {formData.source === "ReferredBy" && (
                            <div className = "other">
                                <span>
                                    <label htmlFor="ReferredBy">Referred By: </label>
                                </span>
                                <div>
                                <input 
                                    type="text" 
                                    name="ReferredBy" 
                                    placeholder="Enter Referred By"
                                    value={formData.ReferredBy}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                            </div>
                        )}
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="contactWithClient">Contact With Client :</label>
                        </span>
                        <div>
                            <select name="contactWithClient" value={formData.contactWithClient} onChange={handleChange}>
                                {connect.map((option) => (
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
                            <label htmlFor="createdData" >Created Date: </label>
                        </span>
                        <div>
                            <input 
                                type = "date" 
                                name = "createdDate" 
                                value = {formData.createdDate}
                                onChange = {handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="Remarks">Remarks: </label>
                        </span>
                        <div>
                            <input 
                                type = "text" 
                                name = "remarks" 
                                placeholder = "Enter Remarks"
                                value = {formData.remarks}
                                onChange = {handleChange}
                                required
                            />
                        </div>
                    </div>
                    <br />
                    <div>
                        <span>
                            <label htmlFor="services">Services: </label>
                        </span>
                        <div>
                            <select name="service" value={formData.service} onChange={handleChange}>
                        {services.map((option) => (
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
                            <label htmlFor="leadStatus">Lead Status: </label>
                        </span>
                        <div>
                            <select name="leadStatus" value={formData.leadStatus} onChange={handleChange}>
                                {leadStatus.map((option) => (
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
                            <label htmlFor="pricing">Pricing: </label>
                        </span>
                        <div>
                            <select name="pricing" value={formData.pricing} onChange={handleChange}>
                                {pricing.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
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

export default LeadForm;
