import { Activity, ArchiveFill, BasketFill, BoxArrowLeft, Building, Person, PersonCircle, ReceiptCutoff, Speedometer, Stack, TagFill } from "react-bootstrap-icons";

const routes = [
    {
        path: "/",
        name: "Dashboard",
        icon: <Speedometer color="white" size={24} className="me-3" />
    },
    {
        path: "/inventory",
        name: "Inventory",
        icon: <ArchiveFill color="white" size={24} className="me-3" />,
        subroutes: [
            {
                path: "/inventory/categories",
                name: "Categories",
                icon: <TagFill color="white" size={24} className="me-3" />
            },
            {
                path: "/inventory/brands",
                name: "Brands",
                icon: <Building color="white" size={24} className="me-3" />
            },
            {
                path: "/inventory/items",
                name: "Items",
                icon: <BasketFill color="white" size={24} className="me-3" />
            },
            {
                path: "/inventory/stocks",
                name: "Stocks",
                icon: <Stack color="white" size={24} className="me-3" />
            },
        ]
    },
    {
        path: "/invoice",
        name: "Invoice",
        icon: <ReceiptCutoff color="white" size={24} className="me-3" />
    },
    {
        path: "/activity",
        name: "Activity",
        icon: <Activity color="white" size={24} className="me-3" />
    },
    {
        path: "/user",
        name: "User",
        icon: <Person color="white" size={24} className="me-3" />,
        subroutes: [
            // {
            //     path: "/user/profile",
            //     name: "Profile",
            //     icon: <PersonCircle color="white" size={24} className="me-3" />
            // },
            {
                path: "/user/logout",
                name: "Logout",
                icon: <BoxArrowLeft color="white" size={24} className="me-3" />
            },
        ]
    },
];

export default routes;