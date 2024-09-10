import { BrowserRouter , Route , Routes } from "react-router-dom"
import { createGlobalStyle } from 'styled-components'
import Dashboard from "./pages/Dashboard"
import Lead from "./pages/Lead"
import Customer from "./pages/Customer"
import Employee from "./pages/Employee"
import {Quotation , Invoice} from "./pages/Payment"
import User from "./pages/User"
import Login from "./pages/Login"
import LeadForm from "./pages/LeadForm";
import CustomerForm from "./pages/CustomerForm";

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Login/>}/>
      <Route path = "/dashboard" element = {<Dashboard />}/>
      <Route path = "/lead" element = {<Lead />}/>
      <Route path = "/customer" element = {<Customer />}/>
      <Route path = "/employee" element = {<Employee />}/>
      <Route path = "/payment/quotation" element = {<Quotation />}/>
      <Route path = "/payment/invoice" element = {<Invoice />}/>
      <Route path = "/user" element = {<User />}/>
      <Route path="/add-lead" element={<LeadForm />} />
      <Route path="/customer-form" element={<CustomerForm />} />
    </Routes>
    </BrowserRouter>
    <GlobalStyle /> 
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #E8E2E2;
  }
`

export default App
