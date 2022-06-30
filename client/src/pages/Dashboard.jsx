import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { PieChart } from 'react-minimal-pie-chart';

// TODO: pie chart: https://www.npmjs.com/package/react-minimal-pie-chart oder https://canvasjs.com/react-charts/pie-chart/

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <div style={{
        height: "300px"
      }}>
        <PieChart
          data={[
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'Three', value: 20, color: '#6A2135' },
          ]}
        />
      </div>
    </div>
  )
}
