import { Table } from "react-bootstrap";
import axios from "../../util/axios";
import DeleteCell from "../common/DeleteCell";

function StockList({ stocks, filter, refreshStocks }) {

    async function onDelete(stock) {
        await axios.delete(`/stocks/delete/${stock.id}`);
        refreshStocks();
    }

    return (
        <div className="mt-2">
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Item</th>
                        <th>Batch no.</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocks.map((stock) =>
                            stock.item_name.toUpperCase().includes(filter.toUpperCase()) &&
                            (
                                <tr>
                                    <td>{stock.id}</td>
                                    <td>{stock.item_name}</td>
                                    <td>{stock.batch_no}</td>
                                    <td>{stock.quantity}</td>
                                    <DeleteCell onDelete={() => onDelete(stock)} />
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default StockList;