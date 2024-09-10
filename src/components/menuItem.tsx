import { FaTh, FaStar, FaPeopleArrows, FaUserTie, FaWallet, FaUser, FaRegNewspaper, FaFileInvoice } from "react-icons/fa";
import * as RiIcons from 'react-icons/ri'

 export const menuItem = [
    {
        id : 1,
        path : '/dashboard',
        name : 'Dashboard',
        icon : <FaTh />,
    },
    {
        id : 2,
        path : '/lead',
        name : 'Lead',
        icon : <FaStar />,
    },
    {
        id : 3,
        path : '/customer',
        name : 'Customer',
        icon : <FaPeopleArrows />,
    },
    {
        id : 4,
        path : '/employee',
        name : 'Employee',
        icon : <FaUserTie />,
    },
    {
        id : 5,
        path : '#',
        name : 'Payment',
        icon : <FaWallet />,
        iconClosed : <RiIcons.RiArrowDownSFill />,
        iconOpened : <RiIcons.RiArrowUpSFill />,
        subNav : [
            {
                path : '/payment/quotation',
                name : 'Quotation',
                icon : <FaRegNewspaper  />,
            },
            {
                path : '/payment/invoice',
                name : 'Invoice',
                icon : <FaFileInvoice   />,
            }
        ],
    },
    {
        id : 6,
        path : '/user',
        name : 'User',
        icon : <FaUser />,
        iconClosed : <RiIcons.RiArrowDownSFill />,
        iconOpened : <RiIcons.RiArrowUpSFill />,
    }    
]
