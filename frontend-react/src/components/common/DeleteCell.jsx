import { Button } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

function DeleteCell({ onDelete }) {
    return (
        <td style={{ maxWidth: "20px" }}>
            <div className="d-flex justify-content-center">
                <Button variant="danger" onClick={onDelete}>
                    <TrashFill color="white" />
                </Button>
            </div>
        </td>
    );
}

export default DeleteCell;