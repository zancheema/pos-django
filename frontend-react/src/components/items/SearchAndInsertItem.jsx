import { FormControl, InputGroup } from "react-bootstrap";
import AddItem from "./AddItem";

function SearchAndInsertItem({ filter, setFilter, refreshItems }) {

    return (
        <div className="d-flex justify-content-between mt-4 border p-2">
            <h2>Items</h2>
            <div className="d-flex ms-2">
                <InputGroup className="me-2 space-between">
                    <FormControl
                        placeholder="Search"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </InputGroup>
                <AddItem refreshItems={refreshItems} />
            </div>
        </div>
    );
}

export default SearchAndInsertItem;