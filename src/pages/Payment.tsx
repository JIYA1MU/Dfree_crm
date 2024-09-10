import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { PiExportBold } from "react-icons/pi";
import { useState } from "react";
import QuotationForm from "./QuotationForm";
import InvoiceForm from "./InvoiceForm";
import Layout from "../components/Layout";
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

export const Quotation = () => {

  const [isFormOpen , setFormOpen] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "clientsName", headerName: "Clients Name", width: 150},
    { field: "clientContactNumber", headerName: "Client Contact Number", width: 180 },
    { field: "clientAddress", headerName: "Client Address", width: 150},
    { field: "clientEmail", headerName: "Client Email", width: 150 },
    { field: "clientGstNumber", headerName: "Client GST Number", width: 150 },
    { field: "quotationNumber", headerName: "Quotation Number", width: 150 },
    { field: "quotationDate", headerName: "Quotation Date", width: 150 },
    { 
      field: "delete",
      headerName: "Delete",
      width: 100,
    },
  ];

  const handleOpenForm = () => {
    setFormOpen(true);
  }

  const handleCloseForm = () => {
    setFormOpen(false);
  }

  //Import excel files into React Table
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event?.target?.result as string | ArrayBuffer | null;
      if (!binaryString) return;

      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const formattedRows = importedData.slice(1).map((row, index) => ({
        id: index + 1,
        clientsName : row[1],
        clientContactNumbe : row[2],
        clientAddress : row[3],
        clientEmail : row[4],
        clientGstNumber : row[5],
        quotationNumber : row[6],
        quotationDate : row[7]
      }));

      setRows(formattedRows);
    };

    reader.readAsBinaryString(file);
  };

  //Export
  const handleExport = () => {
    const data = rows.map(row => ({

      ID : row.id,
      'Clients Name' : row.clientsName,
      'Joining Date' : row.joiningDate,
      'Client Contact Number' : row.clientContactNumber,
      'Client Address' : row.clientAddress,
      'Client Email' : row.clientEmail,
      'Client GST Number' : row.clientGstNumber,
      'Quotation Number' : row.quotationNumber,
      'Quotation Date' : row.quotationDate
    }));

    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Quotation');
    XLSX.writeFile(workbook, 'quotation.xlsx');
  };
  
  return (
    <Layout>
      <Container>
        <button className = "btn" onClick = {handleOpenForm}>
          <IoIosAddCircle className="add" />
          <div className="text">Create Quotation</div>
        </button>

        { isFormOpen && (
          <Overlay onClick = {handleCloseForm}>
            <Modal onClick = {(e) => e.stopPropagation()}>
              <CloseButton onClick={handleCloseForm}>×</CloseButton>
              <QuotationForm />
            </Modal>
          </Overlay>
        )}

        <div className = "table">
          <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
        </div>
        <div className="lower">
          <label htmlFor="import-input" className="btn">
              <div className="text">Import :</div>
              <BiImport className="import" />
            </label>
            <input
              id="import-input"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImport}
              style={{ display: "none" }}
            />
            <button className="btn" onClick={handleExport}>
              <div className="text">Export :</div>
              <PiExportBold className="export" />
            </button>
          </div>
      </Container>
    </Layout>
  )
}

//Invoice

export const Invoice = () => {

  const [isFormOpen , setFormOpen] = useState(false);
  const [rows , setRows ] = useState<any[]>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "clientsName", headerName: "Clients Name", width: 150},
    { field: "clientContactNumber", headerName: "Client Contact Number", width: 180 },
    { field: "clientAddress", headerName: "Client Address", width: 150},
    { field: "clientEmail", headerName: "Client Email", width: 150 },
    { field: "clientGstNumber", headerName: "Client GST Number", width: 150 },
    { field: "invoiceNumber", headerName: "Invoice Number", width: 150 },
    { field: "invoiceDate", headerName: "Invoice Date", width: 150 },
    { 
      field: "delete",
      headerName: "Delete",
      width: 100,
    },
  ];

  const handleOpenForm = () => {
    setFormOpen(true);
  }

  const handleCloseForm = () => {
    setFormOpen(false);
  }

  //Import excel files into React Table
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event?.target?.result as string | ArrayBuffer | null;
      if (!binaryString) return;

      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const formattedRows = importedData.slice(1).map((row, index) => ({
        id: index + 1,
        clientsName : row[1],
        clientContactNumbe : row[2],
        clientAddress : row[3],
        clientEmail : row[4],
        clientGstNumber : row[5],
        invoiceNumber : row[6],
        invoiceDate : row[7]
      }));

      setRows(formattedRows);
    };

    reader.readAsBinaryString(file);
  };

  //Export
  const handleExport = () => {
    const data = rows.map(row => ({

      ID : row.id,
      Name : row.employeename,
      'Employee ID' : row.employeeid,
      'Joining Date' : row.joiningDate,
      'Contact No.' : row.contactNumber,
      'Official Email' : row.officialEmail,
      'Personal Email' : row.personalEmail,
      Position : row.position,
      'Alternate Contact 1' : row.alternateContactNumber_1,
      'Alternate Contact 2' : row.alternateContactNumber_2,
      Address : row.address,
      'Internship/Fulltime' : row.internshipOrFulltime,
      'Current Status' : row.currentStatus,
      Department : row.department
    }));

    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Invoice');
    XLSX.writeFile(workbook, 'invoice.xlsx');
  };

  return (
    <Layout>
      <Container>
        <button className = "btn" onClick = {handleOpenForm}>
          <IoIosAddCircle className="add" />
          <div className="text">Create Invoice</div>
        </button>
        
        { isFormOpen && (
        <Overlay onClick = {handleCloseForm}>
          <Modal onClick = {(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseForm}>×</CloseButton>
            <InvoiceForm />
          </Modal>
        </Overlay>
      )}

        <div className = "table">
          <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
        </div>

        <div className="lower">
          <label htmlFor="import-input" className="btn">
              <div className="text">Import :</div>
              <BiImport className="import" />
            </label>
            <input
              id="import-input"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImport}
              style={{ display: "none" }}
            />
            <button className="btn" onClick={handleExport}>
              <div className="text">Export :</div>
              <PiExportBold className="export" />
            </button>
        </div>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  position: relative; 
  .btn {
    padding: 10px;
    margin: 10px 10px 9px 0;
    background-color: #0b76f3;
    color: white;
    border-radius: 10px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    @media (max-width : 1200px){
        height: 3rem;
        padding: 4px;
    }
    @media (max-width : 600px){
        height: 2rem;
    }
  }
  .text {
    font-size: 20px;
    padding: 10px;
    @media (max-width : 1200px){
        font-size: small;
    }
    @media (max-width : 600px){
        display : none; 
    }
  }
  .add {
    color: white;
    font-size: 40px;
    @media (max-width : 1200px){
      font-size : 25px; 
    }
    @media (max-width : 600px){
      font-size : 20px; 
    }
  }
  .import,
  .export {
    color: white;
    font-size: 40px;
    @media (max-width : 1200px){
      font-size : 25px; 
    }
    @media (max-width : 600px){
      font-size : 17px; 
    }
  }
  .lower {
    display: flex;
    justify-content: space-between;
    @media (max-width : 400px){
      display: block;
      position : absolute;
      left : 28%;
    }
  }
  label{
    @media (max-width : 600px){
        width : 5rem; 
    }
  }
  .table{
    height: 400px; 
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
  }
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
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 50%;
  max-width: 700px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
  position: relative; 
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 10px;
  background: none;
  border: none;
  font-size: 40px;
  cursor: pointer;
`