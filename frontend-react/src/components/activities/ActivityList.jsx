import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { activities } from "../../util/dummy-data";

function ActivityList({ filter }) {
    const [data, setData] = useState([]);

    const loadData = () => setData(activities);

    useEffect(loadData, []);

    return (
        <div className="mt-2">
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(activity =>
                            activity.message.toUpperCase().includes(filter.toUpperCase()) &&
                            (
                                <tr>
                                    <td>{activity.timestamp}</td>
                                    <td>{activity.message}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default ActivityList;