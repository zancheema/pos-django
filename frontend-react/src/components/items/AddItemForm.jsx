import { Form } from "react-bootstrap";

function AddItemForm({ brands, categories, item, handleInputChange }) {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Control
                    name="name"
                    placeholder="Item Name"
                    value={item.name}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="selectBrand">Select Brand</Form.Label>
                <Form.Select name="brand" id="selectBrand" onChange={handleInputChange}>
                    {
                        brands.map((brand) => (
                            <option value={brand.id}>{brand.name}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="selectCategory">Select Category</Form.Label>
                <Form.Select name="category" id="selectCategory" onChange={handleInputChange}>
                    {
                        categories.map((category) => (
                            <option value={category.id}>{category.name}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    name="purchase_price"
                    type="number"
                    placeholder="Purchase Price"
                    value={item.purchase_price}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    name="retail_price"
                    type="number"
                    placeholder="Retail Price"
                    value={item.retail_price}
                    onChange={handleInputChange}
                />
            </Form.Group>
        </Form>
    );
}

export default AddItemForm;