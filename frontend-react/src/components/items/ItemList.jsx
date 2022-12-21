import { Table } from "react-bootstrap";
import axios from "../../util/axios";
import DeleteCell from "../common/DeleteCell";

function ItemList({ items, filter, refreshItems }) {

    async function onDelete(item) {
        try {
            await axios.delete(`/items/delete/${item.id}`);
        } catch (e) {
            return alert("First all stocks of this item should be deleted");
        }
        refreshItems();
    }

    return (
        <div className="mt-2">
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Purchase Price</th>
                        <th>Retail Price</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item) =>
                            item.name.toUpperCase().includes(filter.toUpperCase()) &&
                            (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category_name}</td>
                                    <td>{item.brand_name}</td>
                                    <td>{item.purchase_price}</td>
                                    <td>{item.retail_price}</td>
                                    <td>{item.is_active ? "TRUE" : "FALSE"}</td>
                                    <DeleteCell onDelete={() => onDelete(item)} />
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default ItemList;