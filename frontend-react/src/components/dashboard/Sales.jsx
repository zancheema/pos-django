import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "../../util/axios";
import BarChart from "./charts/BarChart";

function Sales({ width }) {
    const [sales, setSales] = useState([]);

    const labels = () => sales.map(item => item.item_name);
    const data = () => sales.map(item => item.quantity);

    async function loadSales() {
        const sales = (await axios.get('/items/most-bought')).data;
        sales.sort((a, b) => b.quantity - a.quantity);
        setSales(sales);
    }
    useEffect(() => loadSales(), []);

    return (
        <Card className={`w-${width}`}>
            <BarChart datasetData={data()} labels={labels()} title="Most Sold Items" />
        </Card>
    );
}

export default Sales;