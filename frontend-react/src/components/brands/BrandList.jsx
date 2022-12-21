import { Button, Table } from "react-bootstrap";
import axios from "../../util/axios";
import DeleteCell from "../common/DeleteCell";

function BrandList({ brands, filter, refreshBrands }) {

    async function onDelete(brand) {
        try {
            await axios.delete(`/brands/delete/${brand.id}`);
        } catch (e) {
            return alert("First all items of this brand should be deleted.");
        }
        refreshBrands();
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
                        brands.map((brand) =>
                            brand.name.toUpperCase().includes(filter.toUpperCase()) &&
                            (
                                <tr>
                                    <td>{brand.id}</td>
                                    <td>{brand.name}</td>
                                    <td>{brand.is_active ? "TRUE" : "FALSE"}</td>
                                    <DeleteCell onDelete={() => onDelete(brand)} />
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default BrandList;