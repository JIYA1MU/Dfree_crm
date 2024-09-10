import { useState } from 'react';
import styled from 'styled-components';
import QuotationTableForm from './QuotationTableForm'; 
import QuotationDisplay from './QuotationDIsplay';

export interface Quotation {
  clientName: string;
  clientContactNumber: string;
  clientAddress: string;
  clientEmail: string;
  clientGSTNumber: string;
  quotationNo: string;
  quotationDate: any;
  termsAndCondition: string;
  items: TableForm[];
}

export interface TableForm {
  description: string;
  quantity: number;
  rate: number;
  pages: number;
  gst: number;
  amount: number;
}

const src = 'https://www.dfreenovelish.com/static/media/logo.ba7327645e67364a889f.png';

const QuotationForm: React.FC = () => {

  const initialFormData: Quotation = {
    clientName: '',
    clientContactNumber: '',
    clientAddress: '',
    clientEmail: '',
    clientGSTNumber: '',
    quotationNo: '',
    quotationDate: null,
    termsAndCondition: '',
    items: [],
  };

  const [formData, setFormData] = useState<Quotation>(initialFormData);
  const [isDisplayOpen, setDisplayOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (index: number, field: keyof TableForm, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setFormData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  const handleAddItem = () => {
    const newItem: TableForm = {
      description: '',
      quantity: 0,
      rate: 0,
      pages: 0,
      gst: 0,
      amount: 0,
    };
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, newItem],
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form Submitted', formData);
    setDisplayOpen(true);
  };

   const handleCloseDisplay = () => {
    setDisplayOpen(false);
  };

  const calculateTotalAmount = () => {
    if (!formData.items.length) return 0;
  
    const totalAmount = formData.items.reduce((acc, item) => {
      const itemAmount = item.rate * item.quantity;
      return acc + itemAmount;
    }, 0);
  
    return totalAmount;
  };
  
  const calculateAverageGST = () => {
    if (!formData.items.length) return 0;

    const totalGST = formData.items.reduce((acc, item) => {
      return acc + item.gst;
    }, 0);

    return totalGST / formData.items.length;
  };

  const answer = () => {
    const amount = calculateTotalAmount()
    const gst = calculateAverageGST()

    return amount + (amount * (gst / 100))
  }

  return (
    <>
      <ScrollableContainer>
        <h1>Quotation</h1>
        <hr />
        <Static_value>
          <div>GSTIN - 09AAJCD6820F1ZM</div>
          <div>CIN - U72900UP2022OPC173614</div>
        </Static_value>
        <br />
        <Value>
          <div>
            <h3>FROM</h3>
            <div>DfreeNovelish</div>
            <div>info@dfreenovelish.com</div>
            <div>M2, Bhavan 3 Kishangarh Vasudev Amroha, UP-244</div>
          </div>
          <div>
            <img src={src} alt="Dfreenovelish_logo" />
          </div>
        </Value>
        <br />
        <h3 style={{ paddingLeft: '30px' }}>TO</h3>
        <form onSubmit={handleSubmit}>
          <Form>
            <FormElement>
              <div>
                <input
                  type="text"
                  name="clientName"
                  placeholder="Client's Name"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div>
                <input
                  type="text"
                  name="clientContactNumber"
                  placeholder="Client's Contact Number"
                  maxLength={10}
                  value={formData.clientContactNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div>
                <input
                  type="text"
                  name="clientAddress"
                  placeholder="Client's Address"
                  value={formData.clientAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div>
                <input
                  type="email"
                  name="clientEmail"
                  placeholder="Client's Email"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div>
                <input
                  type="text"
                  name="clientGSTNumber"
                  placeholder="Client's GST Number"
                  value={formData.clientGSTNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
            </FormElement>
            <FormElement>
              <div>
                <input
                  type="string"
                  name="quotationNo"
                  placeholder="Enter Quotation Number"
                  value={formData.quotationNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div>
                <span>
                  <label htmlFor="quotationDate">Quotation Date: </label>
                </span>
                <div>
                  <input
                    type="date"
                    name="quotationDate"
                    value={formData.quotationDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <br />
            </FormElement>
          </Form>
          <div>
            <QuotationTableForm items={formData.items} onItemChange={handleItemChange} />
          </div>
          <button className="button" type="button" onClick={handleAddItem}>
            Add Item
          </button>
          <Box>
            <div className="right">
              <div>Total GST : &#8377; {calculateAverageGST()} </div>
              <div >Total Amount : &#8377; {calculateTotalAmount()}</div>
            </div>
          </Box>
          <br />
          <div className="answer">
            <h3 style = {{marginBottom : 0}}>TOTAL</h3>
            <div className = "ans">&#8377; {answer()}</div>
          </div>
          <br />
          <div className="terms">
            <label htmlFor="termsAndCondition" style={{ color: '#696969' }}>
              TERMS AND CONDITION:
            </label>
            <br />
            <textarea
              id="termsAndCondition"
              name="termsAndCondition"
              placeholder="Terms & Condition:"
              value={formData.termsAndCondition || ''}
              onChange={(event) =>
                setFormData((prevData) => ({
                  ...prevData,
                  termsAndCondition: event.target.value,
                }))
              }
              rows={5}
              cols={86}
            />
          </div>
          <hr />
          <Button>
            <button type="submit" className="submit">
              Generate Quotation
            </button>
          </Button>
        </form>
      </ScrollableContainer>
      {isDisplayOpen && (
        <QuotationDisplay 
            quotationDetails={formData}
            items={formData.items}
            onClose={handleCloseDisplay} 
        />
      )}
    </>
  );
};

const ScrollableContainer = styled.div`
  max-height: 700px;
  overflow-y: auto;
  h1 {
    text-align: center;
  }
  h3 {
    color: black;
    margin-top: 0;
  }
  .button {
    padding: 6px;
    margin-top: 5px;
    border: none;
    outline: none;
    background-color: #7a5cfa;
    color: white;
    border-radius: 5px;
  }
  textarea {
    border-radius: 5px;
    padding: 5px;
  }
  .answer{
    display : flex;
    justify-content: space-evenly;
    .ans{
      border: 3px solid #7a5cfa;
      padding : 5px;
      border-radius: 10px;
    }
  }
`

const Static_value = styled.div`
  display: flex;
  justify-content: space-around;
  color: #696969;
  @media (max-width: 600px) {
    display: block;
  }
`

const Value = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 600px) {
    display: block;
  }
  img {
    height: 70px;
  }
`;

const Form = styled.div`
  display: flex;
  justify-content: space-around;
`

const FormElement = styled.div`
  padding: 20px;
  border-radius: 10px;
  label {
    font-size: 14px;
    font-family: 'Noto Sans', sans-serif;
  }
  .other {
    margin-top: 20px;
  }
  input {
    padding: 10px;
    border-radius: 5px;
    outline: none;
    width: 200px;
    height: 20px;
    border: 1px solid gray;
  }
  .text {
    text-align: center;
    padding: 1px;
    bottom: 7px;
    position: relative;
  }
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  .submit {
    background-color: #7a5cfa;
    color: white;
    padding: 15px;
    margin: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 600;
  }
`;
const Box = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #c9c9c9;
  margin-top: 10px;
  border-radius: 10px;
  .right {
    padding: 30px;
    display: flex;
    justify-content: space-around;
  }
`;

export default QuotationForm;