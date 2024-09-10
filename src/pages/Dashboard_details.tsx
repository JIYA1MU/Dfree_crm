import { IoPerson } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa";
import { MdDocumentScanner } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";

export const Dashboard_details = [
    {
        id : 1,
        icon : <IoPerson className = "lead"/>,
        field : 'Total Leads',
        number : 300,
        backgroundColor : '#EAFAE5',
    },
    {
        id : 2,
        icon : < FaPeopleGroup className = "customer"/>,
        field : 'Customer',
        number : 10000,
        backgroundColor : '#FAE5E5',
    },
    {
        id : 3,
        icon : <FaIdCard className = "employee"/>,
        field : 'Employee',
        number : 2000,
        backgroundColor : 'rgb(180, 194, 228)'
    },
    {
        id : 4,
        icon : <FaBookOpenReader className = "quotation"/>,
        field : 'Quotation',
        number : 5000,
        backgroundColor : '#E9EAD1'
    },
    {
        id : 5,
        icon : <MdDocumentScanner className = "invoice"/>,
        field : 'Invoice',
        number : 4970,
        backgroundColor : '#FCDCB8'
    },
]