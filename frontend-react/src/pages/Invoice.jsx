import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Receipt from "../components/invoice/Receipt";
import SearchItem from "../components/invoice/SearchItem";
import SelectionItems from "../components/invoice/SelectionItems";
import axios from "../util/axios";

function Invoice() {
    const [filter, setFilter] = useState("");
    const [stocks, setStocks] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [invoiceItems, setInvoiceItems] = useState([]);

    async function loadStocks() {
        const stocks = (await axios.get("/stocks")).data;
        setStocks(stocks);
    }
    async function loadCustomers() {
        const customers = (await axios.get("/customers")).data;
        setCustomers(customers);
    }
    useEffect(() => {
        loadStocks();
        loadCustomers();
    }, []);

    function addInvoiceItem(stock) {
        const item = {
            stock: stock.id,
            item_id: stock.item_id,
            quantity: 1,
            name: stock.item_name,
            item_price: stock.item_price
        };
        setInvoiceItems(prevState => ([...prevState, item]));
    }

    function removeInvoiceItem(item) {
        setInvoiceItems(invoiceItems.filter(i => i !== item));
    }

    function setQuantity(invoiceItem, event) {
        console.log(`setQuantity(${invoiceItem.stock}, ${event.target.value})`)
        invoiceItem.quantity = parseInt(event.target.value);
        // create copy so that state object reference changes
        setInvoiceItems(invoiceItems.slice());
    }

    function onInvoiceSaved() {
        setInvoiceItems([]);
    }

    return (
        <Container fluid className="pt-4">
            <Row>
                <Col lg={5}>
                    <Receipt
                        invoiceItems={invoiceItems}
                        setQuantity={setQuantity}
                        customers={customers}
                        removeInvoiceItem={removeInvoiceItem}
                        onInvoiceSaved={onInvoiceSaved}
                    />
                </Col>
                <Col>
                    <SearchItem filter={filter} setFilter={setFilter} />
                    <SelectionItems
                        stocks={stocks}
                        invoiceItems={invoiceItems}
                        addInvoiceItem={addInvoiceItem}
                        filter={filter}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Invoice;