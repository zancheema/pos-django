import { FormControl, InputGroup } from "react-bootstrap";
import AddStock from "./AddStock";

function SearchAndInsertStock({ filter, setFilter, refreshStocks }) {

    return (
        <div className="d-flex justify-content-between mt-4 border p-2">
            <h2>Stocks</h2>
            <div className="d-flex ms-2">
                <InputGroup className="me-2 space-between">
                    <FormControl
                        placeholder="Search"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </InputGroup>
                <AddStock refreshStocks={refreshStocks} />
            </div>
        </div>
    );
}

export default SearchAndInsertStock;