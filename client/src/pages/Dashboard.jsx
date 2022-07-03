import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

import toast from 'react-hot-toast';

import CanvasJSReact from '../lib/canvasjs/canvasjs.react';
import { useState } from 'react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Dashboard() {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getStats().then(data => {
      // summ of object values
      let sum = 0;
      for (let key in data) {
        sum += data[key];
      }
      // calculate percentages
      var parsedData = [];
      for (let key in data) {
        parsedData.push({
          y: Math.round((data[key] / sum) * 100),
          label: key
        });
      }

      setChartData(parsedData);
      
    }).catch(toast.error);
  }, []);

  async function getStats() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3001/getStats').then(res => {
          resolve(res.data);
        }).catch(err => {
          reject(err.response.data.error);
        });
    });
  }

  const options = {
    animationEnabled: true,
    title: {
      text: "Flashcard Lernstatus"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: chartData
    }]
  }

  return (
    <>
      <div style={{
        height: "300px"
      }}>
        <CanvasJSChart options={options} />
      </div>
    </>
  )
}
