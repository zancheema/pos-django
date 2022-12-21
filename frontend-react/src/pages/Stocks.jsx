import { useEffect, useState } from "react";
import SearchAndInsertStock from "../components/stocks/SearchAndInsertStock";
import StockList from "../components/stocks/StockList";
import axios from "../util/axios";

function Stocks() {
    const [stocks, setStocks] = useState([]);
    const [filter, setFilter] = useState("");

    async function loadStocks() {
        const stocks = (await axios.get("/stocks")).data;
        setStocks(stocks);
    }
    useEffect(() => loadStocks(), []);

    return (
        <>
            <SearchAndInsertStock
                filter={filter}
                setFilter={setFilter}
                refreshStocks={loadStocks}
            />
            <StockList stocks={stocks} filter={filter} />
        </>
    );
}

export default Stocks;