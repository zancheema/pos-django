import { useEffect, useState } from "react";
import ItemList from "../components/items/ItemList";
import SearchAndInsertItem from "../components/items/SearchAndInsertItem";
import axios from "../util/axios";

function Items() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("");

    async function loadItems() {
        const items = (await axios.get("/items")).data;
        setItems(items);
    }
    useEffect(() => loadItems(), []);

    return (
        <>
            <SearchAndInsertItem
                filter={filter}
                setFilter={setFilter}
                refreshItems={loadItems}
            />
            <ItemList items={items} filter={filter} refreshItems={loadItems} />
        </>
    );
}

export default Items;