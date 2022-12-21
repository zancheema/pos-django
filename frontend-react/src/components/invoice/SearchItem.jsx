import { FormControl, InputGroup } from "react-bootstrap";

function SearchItem({ filter, setFilter }) {

    return (
        <div className="d-flex justify-content-between border p-2">
            <h2>Invoice</h2>
            <div className="d-flex ms-2">
                <InputGroup className="me-2 space-between">
                    <FormControl
                        placeholder="Search Item"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </InputGroup>
            </div>
        </div>
    );
}

export default SearchItem;