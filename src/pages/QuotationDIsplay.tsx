import styled from 'styled-components';
import { Quotation , TableForm} from './QuotationForm'; 

interface QuotationDisplayProps {
  quotationDetails: Quotation; 
  items : TableForm[];
  onClose: () => void;
}

const src = 'https://www.dfreenovelish.com/static/media/logo.ba7327645e67364a889f.png';

const QuotationDisplay: React.FC<QuotationDisplayProps> = ({ quotationDetails, items, onClose }) => {

    const calculateTotalAmount = () : number => {
        if (!items.length) return 0;
      
        const totalAmount = items.reduce((acc, item) => {
          const itemAmount = item.rate * item.quantity;
          return acc + itemAmount;
        }, 0);
      
        return totalAmount;
      };
      
      const calculateAverageGST = () : number => {
        if (!items.length) return 0;
    
        const totalGST = items.reduce((acc, item) => {
          return acc + item.gst;
        }, 0);
    
        return totalGST / items.length;
      };
    
      const answer = () => {
        const amount = calculateTotalAmount()
        const gst = calculateAverageGST()
    
        return amount + (amount * (gst / 100))
      }   
  
  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <Scroll>
            <Component>
                <div className= 'static'>
                    <div>GSTIN - 09AAJCD6820F1ZM</div>
                    <div>CIN - U72900UP2022OPC173614</div>
                </div>
                <br />
                <div className = "value">
                    <h1>Quotation</h1>
                    <div>
                        <img src={src} alt="Dfreenovelish_logo" />
                    </div>
                </div>
            </Component>
            <Main>
                <div className = 'quote'>
                    <div className='left'>
                        <h2>QUOTE TO:  </h2>
                        <div>Dear {quotationDetails.clientName}</div>
                        <br />
                        <div> Services: 
                        {items.map((item, index) => (
                            <div key={index}>
                                {item.description}  
                            </div> ))}
                        </div>
                    </div>
                    <div className="right">
                        <div>Date : {quotationDetails.quotationDate}</div><br />
                        <div>Quote No. : {quotationDetails.quotationNo}</div>
                    </div>
                </div>
                <div>
                    <h2>FROM</h2>
                    <div>DfreeNovelish</div>
                    <div>info@dfreenovelish.com</div>
                    <div>M2, Bhavan 3 Kishangarh Vasudev Amroha, UP-244</div>
                </div>
                <br />
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Pages</th>
                            <th>GST (%)</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td>{item.rate}</td>
                            <td>{item.pages}</td>
                            <td>{item.gst}</td>
                            <td>{item.quantity * item.rate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className= 'box'>
                    <div className="right">
                        <div>Total GST : &#8377; {calculateAverageGST()} </div>
                        <div >Total Amount : &#8377; {calculateTotalAmount()}</div>
                    </div>
                </div>
                <br />
                <div className="answer">
                    <h3 style = {{marginBottom : 0}}>TOTAL</h3>
                    <div className = "ans">&#8377; {answer()}</div>
                </div>
                <br />
                <div className = 'details'>
                    <div>
                        <h3>Account Details</h3>
                        <div>
                            <div>Account Details : DFREENOVELISH (OPC) PVT.LTD.</div>
                            <div>Account Number : 15041100000188</div>
                            <div>Bank Name : Punjab & Sind Bank</div>
                            <div>Bank Address : Mohalla Kishangarh,Opposite Bsnl Exchange Amroha Amroha Uttar Pradesh 244221</div>
                            <div>IFSC Code : PSIB0021504</div>
                        </div>
                    </div>
                    <div>
                        <hr />
                        <h3>SIGNATURE</h3>
                    </div>
                </div>
                <div className="thank">
                    <h1>THANK YOU</h1>
                </div>
            </Main>
            <Component>
                <div className = 'footer'>
                    <div className = 'terms'>Terms & Condition</div>
                    <div>
                        <link href="https://www.dfreenovelish.com/" />www.dfreenovelish.com
                    </div>
                </div>
            <div>{quotationDetails.termsAndCondition}</div>
            </Component>
        </Scroll>
      </Modal>
    </Overlay>
  );
};

const Scroll = styled.div`
    max-height: 700px;
    overflow-y: auto;
`

const Overlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
`

const Modal = styled.div`
background-color: white;
border-radius: 10px;
width: 50%;
max-width: 600px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

const CloseButton = styled.button`
position: absolute;
top: 0px;
right: 10px;
background: none;
border: none;
font-size: 40px;
cursor: pointer;
`

const Component = styled.div`
background-color: #013D51;
color : white;
padding: 10px;
border-radius: 0 0 10px 10px;
.static {
    display: flex;
    justify-content: space-between;
}
.value{
    display: flex;
    justify-content: space-around;
    h1{
        font-size: 40px;
    }
}
.footer{
    display: flex;
    justify-content: space-between;
    border-radius : 0;
}
img {
    height: 70px;
}
`

const Main = styled.div`
color : #013D51;
padding: 10px;
.quote{
    display : flex;
    justify-content: space-between;
    align-items: center ;
    h2{
    margin-top : 0;
    }
}
.details{
    display: flex;
    justify-content: space-between;
    align-items: end;

}
h3{
    margin-top : 0;
}
table {
    width: 100%;
    border-collapse: collapse;
    border-radius : 10px;
    th, td {
        border: 1px solid #013D51;
        padding: 3px;   
    }   
}
.box{
  width: 100%;
  height: 10vh;
  background-color: #013D51;
  color : white;
  margin-top: 10px;
  border-radius: 10px;
  .right {
    padding: 30px;
    display: flex;
    justify-content: space-around;
  }
}
.answer{
    display : flex;
    justify-content: space-evenly;
    font-weight: 800;
}
.thank{
    text-align : center;
}
`

export default QuotationDisplay;

