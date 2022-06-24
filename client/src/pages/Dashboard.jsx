import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { PieChart } from 'react-minimal-pie-chart';

import FlashcardViewer from '../components/FlashcardViewer';
import FlashcardList from '../components/FlashcardList';

// TODO: pie chart: https://www.npmjs.com/package/react-minimal-pie-chart oder https://canvasjs.com/react-charts/pie-chart/

export default function Dashboard() {
  function test() {
    console.log(axios.defaults.headers.common);
    axios.get('http://localhost:3001/test');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <FlashcardList flashcard_array={[
        {
          rubrik: 'Test',
          begriff: 'Testbegriff',
          erklärung: 'Testerklärung',
          lernStatus: 'lernen',
          keyword_array: ['test', 'test2'],
          kommentar_array: ['test', 'test2']
        }
      ]}/>
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

      <button onClick={test}>Test</button>
    </div>
  )
}
