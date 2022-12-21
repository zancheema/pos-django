import React from "react";
import { Table } from "react-bootstrap";

const PrintOut = React.forwardRef(({ phoneNumber, invoiceItems, recommendations }, ref) => {

    function getAmount(invoiceItem) {
        return invoiceItem.item_price * invoiceItem.quantity;
    }

    function getTotal(stocks) {
        let total = 0;
        stocks.forEach(s => total += getAmount(s));
        return total;
    }

    return (
        <div ref={ref} className="receipt">
            <div className="d-flex justify-content-center">
                <h3>Recommender POS</h3>
            </div>
            <div className="d-flex justify-content-around">
                <h5>Customer: </h5>
                <h5>{phoneNumber}</h5>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Item Code</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        invoiceItems.map((invoiceItem, index) => (
                            <tr>
                                <td>{invoiceItem.item_id}</td>
                                <td>{invoiceItem.name}</td>
                                <td>{invoiceItem.quantity}</td>
                                <td>{invoiceItem.item_price}</td>
                                <td>{getAmount(invoiceItem)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Table>
                <thead>
                    <tr>
                        <th>THANKS FOR SHOPPING</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <div className="d-flex justify-content-between">
                            <strong>Total</strong>
                            <div>{getTotal(invoiceItems)}</div>
                        </div>
                    </tr>
                </tbody>
            </Table>
            {
                recommendations.length > 0 &&
                <Table>
                    <thead>
                        <tr>
                            <th>Our Recommendations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recommendations.map(r => (
                                <tr>
                                    <div className="ms-2">{r}</div>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            }
        </div>
    );
});

export default PrintOut;