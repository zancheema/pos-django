import { useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import axios from "../../util/axios";

function AddCategory({ refreshCategories }) {

    const [show, setShow] = useState(false);
    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);

    const [categoryName, setCategoryName] = useState(null);

    async function saveCategory() {
        if (categoryName == null || categoryName == "") {
            alert("Invalid Name");
            return;
        }

        const exists = (
            await axios.get(`categories?name=${categoryName}`)
        ).data.name !== "";
        if (exists) {
            alert("Category Name already exists.");
            return;
        }

        await axios.post('/categories/add', { name: categoryName });
        
        setCategoryName("");
        closeModal();
        refreshCategories();
    }

    return (
        <>
            <Button onClick={showModal}>Add</Button>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormControl
                            placeholder="Name"
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveCategory}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCategory;