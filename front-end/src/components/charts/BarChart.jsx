import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useUsersByDepartmentQuery } from "../../redux/features/stats";
import { useTimeSpentByStageQuery } from "../../redux/features/stats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: false,
      text: "Users by Department",
    },
  },
};

const BarChart = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useTimeSpentByStageQuery({
    startDate: "2024-06-01",
    endDate: "2024-06-07",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const labels = users.map((user) => user.departmentName);
  const dataValues = users.map((user) => parseInt(user.count, 10));

  const data = {
    labels: [
      "submitted",
      "verified",
      "approved",
      "rejected",
      "pending",
      "completed",
      "cancelled",
    ],
    datasets: [
      {
        label: "Number of Users",
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: [
          "rgba(78, 36, 225, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(75, 0, 130, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container component="main" style={{ width: "600px" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Time spent by stage
        </Typography>
        <Box sx={{ width: "100%", height: "400px" }}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
    </Container>
  );
};

export default BarChart;
