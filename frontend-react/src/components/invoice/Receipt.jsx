import { useEffect, useRef, useState } from "react";
import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";
import { useReactToPrint } from "react-to-print";
import axios from "../../util/axios";
import PrintOut from "./PrintOut";

function Receipt({ invoiceItems, setQuantity, customers, removeInvoiceItem, onInvoiceSaved }) {
    const [phone, setPhone] = useState("");
    const [recommendations, setRecommendations] = useState([]);

    const printOutRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => printOutRef.current
    });

    function validPhone() {
        return phone != null && phone !== "";
    }

    async function loadRecommendations() {
        const data = (await axios.get(`/items/recomendations/${phone}`)).data;
        setRecommendations(data);
    }

    async function saveInvoice() {
        const invoice = { invoice_no: crypto.randomUUID().toString(), customer: phone };
        const savedInvoice = (await axios.post("/invoices/add", invoice)).data;

        const items = invoiceItems.map(i => (
            {
                invoice: savedInvoice.invoice_no,
                stock: i.stock,
                quantity: i.quantity
            }
        ));
        items.forEach(async (item) => {
            await axios.post("/invoice-items/add", item);
        });

        await loadRecommendations();
        handlePrint();

        onInvoiceSaved();
    }

    useEffect(() => {
        if (customers.length == 0) return;
        setPhone(customers[0].phone_number);
    }, [customers]);

    return (
        <Card>
            <Card.Header>
                <Card.Title>New Invoice</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form.Select onChange={e => setPhone(e.target.value)}>
                    {
                        customers.map(customer => (
                            <option value={customer.phone_number}>{customer.phone_number}</option>
                        ))
                    }
                </Form.Select>
                {
                    invoiceItems.map(invoiceItem => (
                        <div className="mt-2 d-flex justify-content-between">
                            <div>{invoiceItem.name}</div>
                            <div className="d-flex">
                                <InputGroup style={{ maxWidth: "70px" }}>
                                    <FormControl
                                        type="number"
                                        value={invoiceItem.quantity}
                                        onChange={(e) => setQuantity(invoiceItem, e)}
                                    />
                                </InputGroup>
                                <Button
                                    variant="danger"
                                    className="ms-2"
                                    onClick={() => removeInvoiceItem(invoiceItem)}
                                >
                                    <TrashFill />
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
                <div>
                    <PrintOut
                        ref={printOutRef}
                        phoneNumber={phone}
                        invoiceItems={invoiceItems}
                        recommendations={recommendations}
                    />
                    <Button
                        disabled={!validPhone() || invoiceItems.length == 0}
                        onClick={saveInvoice}
                    >
                        Print
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    );
}

export default Receipt;