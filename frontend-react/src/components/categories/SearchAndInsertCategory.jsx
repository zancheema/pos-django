import { FormControl, InputGroup } from "react-bootstrap";
import AddCategory from "./AddCategory";

function SearchAndInsertCategory({ filter, setFilter, refreshCategories }) {

    return (
        <div className="d-flex justify-content-between mt-4 border p-2">
            <h2>Categories</h2>
            <div className="d-flex ms-2">
                <InputGroup className="me-2 space-between">
                    <FormControl
                        placeholder="Search"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </InputGroup>
                <AddCategory refreshCategories={refreshCategories} />
            </div>
        </div>
    );
}

export default SearchAndInsertCategory;