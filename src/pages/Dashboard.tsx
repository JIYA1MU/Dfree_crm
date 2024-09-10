import styled from "styled-components";
import Layout from "../components/Layout";
import { Dashboard_details } from "./Dashboard_details";
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts/Gauge';

import Typography from '@mui/material/Typography';

const Dashboard = () => {
  
  return (
    <Layout>
      <Container>
        <div className="upper">
          {Dashboard_details.map((item) => (
            <div key={item.id} className="item">
              <div className="icon" style = {{ backgroundColor : (item.backgroundColor)}}>
                {item.icon}
              </div>
              <div className = "value">
                <div className = "field">
                  {item.field}
                </div>
                <div className = "number">
                  <strong>{item.number}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lower">
          
          {/* Charts starts from here */}
          <div className = "charts-upper">

            <div className = "line">
            <Typography variant="h5" align="center" >
              Lead Status
            </Typography>
              <LineChart
                xAxis={[{ data: [0 ,1, 2, 3, 5, 8, 10] }]}
                series={[
                  { curve: 'natural' ,data: [0 , 2, 5.5, 2, 8.5, 1.5, 5] },
                  { curve: 'natural' , data : [0,2.5,1,3,3,7,12] }
                ]}
                height={300}
                width={400}
                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              />
            </div>

            <div className="bar">
              <Typography variant="h5" align="center" >
                Services
              </Typography>
                <BarChart
                  xAxis={[{ scaleType: 'band', 
                    data: ['Academic' , 'Resume' , 'sop', 'E-tutorial', 'web', 'content', 'smm']}]}
                  series={[{ data: [4, 3, 5, 6, 2, 3 , 5 , 8] }]}
                  width={400}
                  height={300}
                />
            </div>

            <div className="occupation">
              <Typography variant="h5" align="center" >
               Occupation
              </Typography>
                <BarChart
                  xAxis={[{ scaleType: 'band', 
                    data: ['Student' , 'Professor' , 'Business Owner']}]}
                  series={[{ data: [8, 3 ,5] }]}
                  width={400}
                  height={300}
                />
            </div>

          </div>
          <div className="charts-lower">
            
            <div className="pie">
              <Typography variant="h5" align="center" >
                Contact with client 
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 50, label: 'Whatsapp' },
                      { id: 1, value: 15, label: 'Call' },
                      { id: 2, value: 15, label: 'Text' },
                      { id: 3, value: 20, label: 'sEmail' },
                    ],
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -190,
                    endAngle: 180,
                    cx: 150,
                    cy: 150,
                  }
                ]}
                width = {400}
                height = {300}
              />
            </div>

            <div className="barh">
              <Typography variant="h5" align="center" >
                Sources
              </Typography>
              <BarChart
                yAxis={[{ scaleType: 'band', 
                  data: ['Telegram' , 'LinkedIn' , 'Facebook', 'Instagram', 'Other', 'Referred by someone'
                  ]}]}
                series={[{ data: [4, 3, 5, 6, 2, 3 , 5 , ] }]}
                layout="horizontal"
                width={400}
                height={300}
              />
            </div>

            <div className="revenue">
              <Typography variant="h5" align="center" >
                Total Revenue
              </Typography>
              <Gauge 
                width={400} 
                height={300} 
                value={60} 
                startAngle={-90} endAngle={90} 
              />
            </div>

          </div>
        </div>
      </Container>
    </Layout>
  )
}
  
const Container = styled.div`
.upper{
  background-color: #d6d5d5;
  padding : 15px;
  border-radius: 10px ;
  text-align: center;
  display: flex;
  justify-content: space-between;
  @media (max-width : 900px){
    display : block;
  }
}
.item{
  display: flex;
  align-items: center;
  padding : 10px;
  @media (max-width : 900px){
    justify-content : center;
  }
}
.icon{
  padding: 10px;
  border-radius: 50%;
  width : 50px;
  height : 50px;
  text-align : center;
}
.lead {
  font-size : 45px;
  color : #46ca46;
}
.customer{
  font-size : 45px;
  color : #f02929;
}
.employee{
  font-size : 45px;
  color : blue;
}
.quotation{
  font-size : 45px;
  color : #e6e60d;
}
.invoice{
  font-size : 45px;
  color : orange;
}
.value{
  padding-left : 20px;
  font-family: "Noto Sans", sans-serif;
  .field{
    font-size : 20px;
  }
  .number{
    font-size : 22px;
  }
}
.charts-upper ,.charts-lower{
  display: flex;
  justify-content: space-evenly;
  /* @media (max-width : 900px){
    display : block;
  } */
  .line , .bar ,.pie , .barh ,.revenue , .occupation{
    background-color : white;
     margin-top : 20px;
     margin-right : 30px;
     padding: 10px;
     border-radius: 15px;
  }
  /* @media (max-width : 900px){
    background-color: none;
  } */
  h5{
    font-weight: 800;
  }
}`

export default Dashboard;