import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "../../util/axios";
import LineChart from "./charts/LineChart";

function SalesProgress({ width }) {
    const [salesProgress, setSalesProgress] = useState([]);
    const labels = () => salesProgress.map(s => s.date);
    const data = () => salesProgress.map(s => s.quantity);

    async function loadSalesProgress() {
        const sales = (await axios.get("/items/sales")).data;
        sales.sort((a, b) => a.data < b.date ? -1 : 1);
        setSalesProgress(sales);
    }
    useEffect(() => loadSalesProgress(), []);

    return (
        <Card className={`w-${width}`}>
            <LineChart datasetData={data()} labels={labels()} title={"Sales Progress"} />
        </Card>
    );
}

export default SalesProgress;