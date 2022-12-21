import { FormControl, InputGroup } from "react-bootstrap";
import AddBrand from "./AddBrand";

function SearchAndInsertBrand({ filter, setFilter, refreshBrands }) {

    return (
        <div className="d-flex justify-content-between mt-4 border p-2">
            <h2>Brands</h2>
            <div className="d-flex ms-2">
                <InputGroup className="me-2 space-between">
                    <FormControl
                        placeholder="Search"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </InputGroup>
                <AddBrand refreshBrands={refreshBrands} />
            </div>
        </div>
    );
}

export default SearchAndInsertBrand;