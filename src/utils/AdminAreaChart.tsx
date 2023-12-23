import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminAreaChart = ({ dataMode, lastUnit }: { dataMode: string, lastUnit: number}) => {
  const getLastFiveDays = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const lastFiveDays = [];

    for (let i = lastUnit; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayName = dayNames[date.getDay()];
      lastFiveDays.push(dayName);
    }

    return lastFiveDays;
  };

  const getLastMonths = () => {
    const today = new Date();
    const lastMonths = [];

    for (let i = lastUnit; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      const monthName = new Intl.DateTimeFormat("en-US", {
        month: "short",
      }).format(date);
      lastMonths.push(monthName);
    }

    return lastMonths;
  };

  const getLastYears = () => {
    const today = new Date();
    const lastYears = [];

    for (let i = lastUnit; i >= 0; i--) {
      const date = new Date(today);
      date.setFullYear(today.getFullYear() - i);
      lastYears.push(date.getFullYear().toString());
    }

    return lastYears;
  };

  const getYAxisData = () => {
    switch (dataMode) {
      case "Day":
        return getLastFiveDays();
      case "Month":
        return getLastMonths();
      case "Year":
        return getLastYears();
      default:
        return [];
    }
  };

  const data = getYAxisData().map((axisItem) => ({
    name: axisItem,
    uv: Math.floor(Math.random() * 5000), // Replace this with your actual data
    pv: Math.floor(Math.random() * 5000), // Replace this with your actual data
    amt: Math.floor(Math.random() * 5000), // Replace this with your actual data
  }));

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.amt));
    const dataMin = Math.min(...data.map((i) => i.amt));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  return (
    <ResponsiveContainer width="100%" height={380}>
      <AreaChart
        //   style={{width:"100%"}}
        // width={500}
        // height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset={gradientOffset()}
              stopColor="green"
              stopOpacity={0.7}
            />
            <stop
              offset={gradientOffset()}
              stopColor="yellow"
              stopOpacity={0.7}
            />
          </linearGradient>
        </defs>
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="url(#colorUv)"
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AdminAreaChart;
