import { Table } from "react-bootstrap";
import axios from "../../util/axios";
import DeleteCell from "../common/DeleteCell";

function CategoryList({ categories, filter, refreshCategories }) {

    async function onDelete(category) {
        try {
            await axios.delete(`/categories/delete/${category.id}`);
        } catch (e) {
            return alert("First all items of this category should be deleted.");
        }
        refreshCategories();
    }

    return (
        <div className="mt-2">
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((category) =>
                            category.name.toUpperCase().includes(filter.toUpperCase()) &&
                            (
                                <tr>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>{category.is_active ? "TRUE" : "FALSE"}</td>
                                    <td style={{ maxWidth: "20px" }}>
                                        <div className="d-flex justify-content-center">
                                            <DeleteCell onDelete={() => onDelete(category)} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default CategoryList;