import React from 'react';
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const LineChartGraph = ({data}) => {

  

  return (
    <div>
      <h2>Income Chart</h2>
      <ResponsiveContainer width="120%" aspect={3}>
        <LineChart data={data} margin={{ right: 300 }}>
          <CartesianGrid />
          <XAxis dataKey="Month" interval={"preserveStartEnd"} />
          <YAxis ></YAxis>
          <Legend />
          <Tooltip />
          <Line
            dataKey="income"
            stroke="red"
            activeDot={{ r: 8 }}
          />
          
          {/* <Line dataKey="fees" stroke="red" activeDot={{ r: 8 }} /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartGraph;
