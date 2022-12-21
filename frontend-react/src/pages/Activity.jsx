import { useState } from "react";
import ActivityList from "../components/activities/ActivityList";
import SearchActivity from "../components/activities/SearchActivity";

function Activity() {
    const [filter, setFilter] = useState("");

    return (
        <>
            <SearchActivity filter={filter} setFilter={setFilter} />
            <ActivityList filter={filter} />
        </>
    );
}

export default Activity;