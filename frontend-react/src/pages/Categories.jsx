import { useEffect, useState } from "react";
import CategoryList from "../components/categories/CategoryList";
import SearchAndInsertCategory from "../components/categories/SearchAndInsertCategory";
import axios from "../util/axios";

function Categories() {
    const [filter, setFilter] = useState("");
    const [categories, setCategories] = useState([]);

    async function loadCategories() {
        let data = (await axios.get("/categories")).data;
        console.log(`categories data: ${data}`);
        setCategories(data);
    }
    useEffect(() => loadCategories(), []);

    return (
        <>
            <SearchAndInsertCategory
                filter={filter}
                setFilter={setFilter}
                refreshCategories={loadCategories}
            />
            <CategoryList categories={categories} filter={filter} refreshCategories={loadCategories} />
        </>
    );
}

export default Categories;