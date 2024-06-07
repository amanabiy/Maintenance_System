import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useUsersByDepartmentQuery } from "../../redux/features/stats";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}`;
        },
      },
    },
  },
};

const PieChartt = () => {
  const { data: users, isLoading, error } = useUsersByDepartmentQuery();
  console.log(users, isLoading, error);

  let data = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [
          "rgba(78, 36, 225, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(75, 0, 130, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (!isLoading && !error && users) {
    const labels = users.map((user) => user.departmentName);
    const dataValues = users.map((user) => parseInt(user.count, 10));

    data = {
      labels: labels,
      datasets: [
        {
          label: "# of Votes",
          data: dataValues,
          backgroundColor: [
            "rgba(78, 36, 225, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(75, 0, 130, 0.8)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Container component="main" maxWidth="md" style={{ width: "400px" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Users By Department
        </Typography>
        <Pie data={data} options={options} style={{ width: "100%" }} />
      </Box>
    </Container>
  );
};

export default PieChartt;
