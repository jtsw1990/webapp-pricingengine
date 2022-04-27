import { Bar } from "react-chartjs-2";
import { Chart, registerables, xAxes } from "chart.js";
Chart.register(...registerables);

const CoefChart = (props) => {
  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {

    datasets: [
      {
        label: "Model Coefficients",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: props.datasets,
      },
    ],
  };
  const options = {
      scales: {
          x: {
              type: "category",
              labels: props.labels
          }
      }
  }
  return (
  <Bar data={data} options={options}/>
  );
};

export default CoefChart;
