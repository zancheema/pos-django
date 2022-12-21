import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "../../util/axios";
import { items as dummyItems } from "../../util/dummy-data";
import AddStockForm from "./AddStockForm";

function AddStock({ refreshStocks }) {

    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);
    const [stock, setStock] = useState({});

    const closeModal = () => setShow(false);
    const showModal = () => {
        if (items.length === 0) {
            return alert("No Items Available.");
        }
        setShow(true);
    };

    async function loadDependencies() {
        const items = (await axios.get("/items")).data;
        setItems(items);
    }
    useEffect(loadDependencies, []);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setStock(prevState => ({ ...prevState, [name]: value }));
    }

    async function saveStock() {
        const data = stock;
        if (!data.item)
            data.item = items[0].id;

        if (!data.batch_no || data.batch_no === "") {
            alert("Batch no. is required.");
        } else if (!data.quantity || data.quantity === "") {
            alert("Quantity is required.");
        } else {
            await axios.post("/stocks/add", stock);

            setStock({});
            closeModal();
            refreshStocks();
        }
    }

    return (
        <>
            <Button onClick={showModal}>Add</Button>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Add Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddStockForm
                        stock={stock}
                        items={items}
                        handleInputChange={handleInputChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveStock}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddStock;