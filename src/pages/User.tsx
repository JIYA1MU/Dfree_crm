import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { PiExportBold } from "react-icons/pi";
import { useState } from "react";
import UserForm from "./UserForm";
import Layout from "../components/Layout";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

const User = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rows , setRows ] = useState<any[]>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 150},
    { field: "lastName", headerName: "Last Name", width: 150},
    { field: "userName", headerName: "User Name", width: 150},
    { field: "password", headerName: "Password", width: 150},
    { field: "email", headerName: "Email", width: 150},
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "role", headerName: "Role", width: 150},
    { field: "contactNumber", headerName: "Contact No.", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "authority", headerName: "Authority", width: 150},
    { 
      field: "delete",
      headerName: "Delete",
      width: 100,
    },
  ];

  const handleOpenForm = () => {
    setIsFormOpen(true); 
  };
  
  const handleCloseForm = () => {
    setIsFormOpen(false); 
  };

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
        firstName : row[1],
        lastName : row[2],
        userName : row[3],
        password : row[4],
        email : row[5],
        userId : row[6],
        role: row[7],
        contactNumber : row[8],
        department : row[9],
        authority : row[10]
      }));

      setRows(formattedRows);
    };

    reader.readAsBinaryString(file);
  };

  //Export
  const handleExport = () => {
    const data = rows.map(row => ({
      ID: row.id,
      'First Name': row.firstName,
      'Last Name': row.lastName,
      'User Name': row.userName,
      Password: row.password,
      Email : row.email,
      'User ID': row.userId,
      Role: row.role,
      'Contact No.': row.contactNumber,
      Department: row.department,
      Authority : row.authority
    }));

    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet, 'User');
    XLSX.writeFile(workbook, 'user.xlsx');
  };

  return (
    <Layout>
      <Container>
        <button className = "btn" onClick={handleOpenForm}>
          <IoIosAddCircle className="add" />
          <div className="text">Add new User</div>
        </button>

        {isFormOpen && (
        <Overlay onClick={handleCloseForm}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseForm}>×</CloseButton>
            <UserForm  />
          </Modal>
        </Overlay>
        )}

        <div className = "box">
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
`

  export default User;