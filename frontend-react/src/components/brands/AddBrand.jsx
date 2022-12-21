import { useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import axios from "../../util/axios";

function AddBrand({ refreshBrands }) {

    const [show, setShow] = useState(false);
    const closeModal = () => setShow(false);
    const showModal = () => setShow(true);

    const [name, setName] = useState(null);

    async function saveBrand() {
        if (name == null || name == "") {
            alert("Invalid Name");
            return;
        }

        const exists = (
            await axios.get(`/brands?name=${name}`)
        ).data.name !== "";
        if (exists) {
            alert("Brand already exists");
            return;
        }

        await axios.post('/brands/add', { name: name });

        setName("");
        closeModal();
        refreshBrands();
    }

    return (
        <>
            <Button onClick={showModal}>Add</Button>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Add Brand</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormControl
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveBrand}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddBrand;