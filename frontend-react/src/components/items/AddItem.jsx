import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "../../util/axios";
import AddItemForm from "./AddItemForm";

function AddItem({ refreshItems }) {

    const [show, setShow] = useState(false);
    const closeModal = () => setShow(false);
    const showModal = () => {
        if (brands.length === 0) {
            return alert("No Brands Available.");
        }
        if (categories.length === 0) {
            return alert("No Categories Avaialble.");
        }
        setShow(true);
    };

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const [item, setItem] = useState({});

    async function loadDependencies() {
        const brands = (await axios.get("/brands")).data;
        setBrands(brands);

        const categories = (await axios.get("/categories")).data;
        setCategories(categories);
    }
    useEffect(loadDependencies, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setItem(prevState => ({ ...prevState, [name]: value }));
    }

    async function saveItem() {
        const data = item;
        if (!data.brand)
            data.brand = brands[0].id;
        if (!data.category)
            data.category = categories[0].id;

        data.brand = parseInt(data.brand);
        data.category = parseInt(data.category);

        if (!data.name || data.name === "") {
            alert("Name is required.");
            return;
        }

        if (!data.purchase_price || data.purchase_price === "") {
            alert("Purchase Price is required.");
            return;
        }
        if (!data.retail_price || data.retail_price === "") {
            alert("Retail Price is required.");
            return;
        }
        data.purchase_price = parseFloat(data.purchase_price);
        data.retail_price = parseFloat(data.retail_price);
        if (data.purchase_price > data.retail_price) {
            console.log(`${data.purchase_price} > ${data.retail_price}`);
            alert("Purchase price should be lower than retail price");
            return;
        }

        console.log(`Posted Item: ${JSON.stringify(data)}`);
        await axios.post("/items/add", data);

        setItem({});
        closeModal();
        refreshItems();
    }

    return (
        <>
            <Button onClick={showModal}>Add</Button>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddItemForm
                        brands={brands}
                        categories={categories}
                        item={item}
                        handleInputChange={handleInputChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveItem}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddItem;