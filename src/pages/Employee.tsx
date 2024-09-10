import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { BiImport } from "react-icons/bi";
import { PiExportBold } from "react-icons/pi";
import { useState  } from "react";
import EmployeeForm from "./EmployeeForm";
import Layout from "../components/Layout";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

const Employee = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rows , setRows ] = useState<any[]>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "employeename", headerName: "Name"},
    { field: "employeeid", headerName: "Employee ID", width: 150 },
    { field: "joiningDate", headerName: "Joining Date", width: 150 },
    { field: "contactNumber", headerName: "Contact No.", width: 150 },
    { field: "officialEmail", headerName: "Official Email", width: 150 },
    { field: "personalEmail", headerName: "Personal Email", width: 150 },
    { field: "position", headerName: "Position" },
    { field: "alternateContactNumber_1", headerName: "Alternate Contact 1", width: 150 },
    { field: "alternateContactNumber_2", headerName: "Alternate Contact 2", width: 150 },
    { field: "address", headerName: "Address"},
    { field: "internshipOrFulltime", headerName: "Internship/Fulltime", width: 150 },
    { field: "currentStatus", headerName: "Current Status", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
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
        employeename : row[1],
        employeeid : row[2],
        joiningDate : row[3],
        contactNumber : row[4],
        officialEmail : row[5],
        personalEmail : row[6],
        position : row[7],
        alternateContactNumber_1 : row[8],
        alternateContactNumber_2 : row[9],
        address : row[10],
        internshipOrFulltime : row[11],
        currentStatus : row[12],
        department: row[13]
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
    XLSX.utils.book_append_sheet(workbook, sheet, 'Employee');
    XLSX.writeFile(workbook, 'employee.xlsx');
  };

  return (
    <Layout>
      <Container>
        <button className = "btn" onClick={handleOpenForm}>
          <IoIosAddCircle className="add" />
          <div className="text">Add new Employee</div>
        </button>

        {isFormOpen && (
        <Overlay onClick={handleCloseForm}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseForm}>×</CloseButton>
            <EmployeeForm  />
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
      font-size: 20px; 
    }
  }
  .import,
  .export {
    color: white;
    font-size: 30px;
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

export default Employee;