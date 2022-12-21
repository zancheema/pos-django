import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { sales } from '../../../util/dummy-data';
import { getColorList } from '../../../util/functions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart({ labels, datasetData, title }) {
    const colorList = getColorList(sales);

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
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: null,
            title: {
                display: true,
                text: title,
            },
        },
    };

    return (<Bar options={options} data={data} />);
}

export default BarChart;