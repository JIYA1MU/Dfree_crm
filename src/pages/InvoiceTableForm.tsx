import styled from 'styled-components';

interface TableForm {
    description: string;
    quantity: number;
    rate: number;
    pages: number;
    gst: number;
    amount: number;
}

interface Props {
    items: TableForm[];
    onItemChange: (index: number, field: keyof TableForm, value: string | number) => void;
}

const InvoiceTableForm: React.FC<Props> = ({ items, onItemChange }) => {
    return (
      <Table>
        <thead>
          <tr>
            <th>DESCRIPTION</th>
            <th>QUANTITY</th>
            <th>RATE</th>
            <th>PAGES</th>
            <th>GST</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.description}
                  placeholder = 'Decription Here'
                  onChange={(e) => onItemChange(index, 'description', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onItemChange(index, 'quantity', parseInt(e.target.value, 10))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) => onItemChange(index, 'rate', parseFloat(e.target.value))}
              />
              </td>
              <td>
                <input
                  type="number"
                  value={item.pages}
                  onChange={(e) => onItemChange(index, 'pages', parseInt(e.target.value, 10))}
              />
              </td>
              <td>
                <input
                  type="number"
                  value={item.gst}
                  onChange={(e) => onItemChange(index, 'gst', parseFloat(e.target.value))}
                />
              </td>
              <td>
              <input
                type="number"
                value={item.quantity * item.rate}
                onChange={(e) => onItemChange(index, 'amount', parseFloat(e.target.value))}
              />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
};

const Table = styled.table`
width: 100%;
border-collapse: collapse;
th, td {
  border: 1px solid #ddd;
  padding: 3px;
}
th {
  background-color: #f2f2f2;
}
input{
  width : 100px;
  border : none;
  outline : none;
}
`

export default InvoiceTableForm;
