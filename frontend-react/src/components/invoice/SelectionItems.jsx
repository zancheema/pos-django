import { Button, Table } from "react-bootstrap";

function SelectionItems({ stocks, invoiceItems, addInvoiceItem, filter }) {

    return (
        <div className="mt-2">
            <Table striped>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Item</th>
                        <th>Unit Price</th>
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
                                    <td>{stock.item_price}</td>
                                    <td>{stock.batch_no}</td>
                                    <td>{stock.quantity}</td>
                                    <td>
                                        <Button
                                            className="ms-2"
                                            onClick={() => addInvoiceItem(stock)}
                                            disabled={invoiceItems.filter(i => i.stock === stock.id).length > 0 ? true : false}
                                        >
                                            Add
                                        </Button>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default SelectionItems;