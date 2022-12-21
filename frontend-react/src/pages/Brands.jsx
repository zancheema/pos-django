import { useEffect, useState } from "react";
import BrandList from "../components/brands/BrandList";
import SearchAndInsertBrand from "../components/brands/SearchAndInsertBrand";
import axios from "../util/axios";

function Brands() {
    const [brands, setBrands] = useState([]);
    const [filter, setFilter] = useState("");

    async function loadBrands() {
        const brands = (await axios.get("/brands")).data;
        setBrands(brands);
    }
    useEffect(() => loadBrands(), []);

    return (
        <>
            <SearchAndInsertBrand
                filter={filter}
                setFilter={setFilter}
                refreshBrands={loadBrands}
            />
            <BrandList brands={brands} filter={filter} refreshBrands={loadBrands} />
        </>
    );
}

export default Brands;