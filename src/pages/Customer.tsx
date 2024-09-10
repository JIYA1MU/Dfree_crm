import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { PiExportBold } from "react-icons/pi";
import { FaMinusCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import CustomerForm from "./CustomerForm";
import Layout from "../components/Layout";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import axios from 'axios';

const Customer = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customers');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleOpenForm = () => {
    setIsFormOpen(true); 
  };
  
  const handleCloseForm = () => {
    setIsFormOpen(false); 
  };
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${id}`);
      setRows(rows.filter(row => row.id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "contactNumber", headerName: "Contact No.", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "createdDate", headerName: "Created on", width: 150 },
    { field: "owner", headerName: "Owner", width: 150 },
    { field: "remarks", headerName: "Remarks", width: 150 },
    { field: "occupation", headerName: "Occupation", width: 150 },
    { field: "service", headerName: "Service", width: 150 },
    { field: "source", headerName: "Source", width: 150 },
    {
      field: "Delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <DeleteButton onClick={() => handleDelete(params.row.id)}>
          <FaMinusCircle />
        </DeleteButton>
      ),
    },
  ];
    
  
  const handleCustomerAdded = (newCustomer : any) => {
    setRows((prevRows) => [...prevRows, { ...newCustomer, id: newCustomer.id || prevRows.length + 1 }]);
    setIsFormOpen(false);
  };
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
        name: row[1],
        contactNumber: row[2],
        email: row[3],
        createdDate: row[4],
        owner: row[5],
        remarks: row[6],
        occupation: row[7],
        service: row[8],
        source: row[9]
      }));

      setRows(formattedRows);
    };

    reader.readAsBinaryString(file);
  };

  const handleExport = () => {
    const data = rows.map(row => ({
      ID: row.id,
      Name: row.name,
      'Contact No.': row.contactNumber,
      Email: row.email,
      'Created On': row.createdDate,
      Owner: row.owner,
      Remarks: row.remarks,
      Occupation: row.occupation,
      Service: row.service,
      Source: row.source
    }));
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Customers');
    XLSX.writeFile(workbook, 'customers.xlsx');
  };
    
  return (
    <Layout>
      <Container>
          <button className="btn" onClick={handleOpenForm}>
            <IoIosAddCircle className="add" />
            <div className="text">Add new Customer</div>
          </button>

          {isFormOpen && (
          <Overlay onClick={handleCloseForm}>
            <Modal onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={handleCloseForm}>×</CloseButton>
              <CustomerForm onCustomerAdded={handleCustomerAdded} />
            </Modal>
          </Overlay>
        )}

        <div className="box">
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
            <div className="text">Import</div>
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
            <div className="text">Export</div>
            <PiExportBold className="export" />
          </button>
        </div>
      </Container>
    </Layout>
  );
};

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
    text-align : center;
    @media (max-width : 1200px){
        height: 3rem;
        padding: 4px;
    }
  }
  .text {
    font-size: 20px;
    padding: 10px;
    @media (max-width : 1200px){
        font-size: small;
    }
  }
  .add {
    color: white;
    font-size : 40px;
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
    @media (max-width : 600px){
        font-size : 17px; 
    }
    @media (max-width : 1200px){
      font-size : 25px; 
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
  .box {
    height: 400px; 
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
  }
`;

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
  max-width: 600px;
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
`;
const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 1.2rem;
`;
export default Customer;