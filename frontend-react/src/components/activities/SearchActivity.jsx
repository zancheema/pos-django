import { FormControl, InputGroup } from "react-bootstrap";

function SearchActivity({ filter, setFilter }) {

    return (
        <div className="d-flex justify-content-between mt-4 border p-2">
            <h2>Activity</h2>
            <InputGroup className="mx-2 space-between">
                <FormControl
                    placeholder="Search"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />
            </InputGroup>
        </div>
    );
}

export default SearchActivity;