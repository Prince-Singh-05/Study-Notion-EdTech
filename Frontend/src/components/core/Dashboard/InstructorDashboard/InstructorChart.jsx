import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
  const [currentChart, setCurrentChart] = useState("students");

  // generate random colors
  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256,
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // create data for student chart
  const studentData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Students",
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  // create data for income chart
  const incomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Income",
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  // create oprions for chart
  const config = {
    type: "pie",
    data: currentChart === "students" ? studentData : incomeData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: currentChart === "students" ? "Students" : "Income",
          font: { size: 20 },
          color: "#F1F2FF",
          padding: {
            bottom: 30,
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-auto flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualise</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrentChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Student
        </button>

        <button
          onClick={() => setCurrentChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>

      <div className="relative mx-auto h-[300px] w-full">
        <Pie
          data={currentChart === "students" ? studentData : incomeData}
          options={config.options}
        />
      </div>
    </div>
  );
};

export default InstructorChart;
