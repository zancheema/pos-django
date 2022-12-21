import { Form } from "react-bootstrap";

function AddStockForm({ stock, items, handleInputChange }) {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="selectItem">Select Item</Form.Label>
                <Form.Select name="item" id="selectItem" onChange={handleInputChange}>
                    {
                        items.map((item) => (
                            <option value={item.id}>{item.name}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    name="batch_no"
                    type="number"
                    placeholder="Batch no."
                    value={stock.batch_no}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    value={stock.quantity}
                    onChange={handleInputChange}
                />
            </Form.Group>
        </Form>
    );
}

export default AddStockForm;