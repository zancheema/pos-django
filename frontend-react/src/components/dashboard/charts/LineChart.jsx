import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getColorList } from '../../../util/functions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function LineChart({ labels, datasetData, title }) {

    const colorList = getColorList(labels);

    const data = {
        labels,
        datasets: [
            {
                data: datasetData,
                borderColor: colorList,
                backgroundColor: colorList,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: null,
            title: {
                display: true,
                text: title,
            },
        },
    };

    return <Line options={options} data={data} />
}

export default LineChart;