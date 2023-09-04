import React from "react";
import { Pie } from "react-chartjs-2";

const ComplaintPieChart = ({ complaintData }) => {
  const data = {
    labels: ["OPENED", "UNDER REVIEW", "RESOLVED", "CLOSED"],
    datasets: [
      {
        data: [
          complaintData.OPENED,
          complaintData.UNDER_REVIEW,
          complaintData.RESOLVED,
          complaintData.CLOSED,
        ],
        backgroundColor: ["#ff0000", "#ff6600", "#0000cc", "#00cc00"],
      },
    ],
  };

  return (
    <div className="pie-chart-container">
      <h3>Complaint Status Distribution</h3>
      <Pie data={data}/>
    </div>
  );
};

export default ComplaintPieChart;
