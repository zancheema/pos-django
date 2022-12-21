import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "../../util/axios";
import PieChart from "./charts/PieChart";

function CategoryDistribution() {
    const [distribution, setDistribution] = useState([]);

    const labels = () => distribution.map(l => l.category_name);
    const data = () => distribution.map(l => l.quantity);

    async function loadDistribution() {
        const distribution = (await axios.get("/categories/distribution")).data;
        distribution.sort((a, b) => b.quantity - a.quantity);
        setDistribution(distribution);
    }

    useEffect(() => loadDistribution(), []);

    return (
        <Card>
            <PieChart
                labels={labels()}
                datasetData={data()}
                title="Category Distribution"
            />
        </Card>
    );
}

export default CategoryDistribution;