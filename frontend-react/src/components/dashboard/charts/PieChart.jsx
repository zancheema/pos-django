import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getColorList } from '../../../util/functions';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ labels, datasetData, title }) {

  const colorList = getColorList(datasetData);

  const data = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: datasetData,
        backgroundColor: colorList,
        borderColor: colorList,
        borderWidth: 1,
      },
    ],
  };

  return (<Pie data={data} />);
}

export default PieChart;