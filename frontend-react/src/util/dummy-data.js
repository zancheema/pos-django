

export const categories = [
    {
        id: 1,
        name: 'Clothing',
        is_active: true
    },
    {
        id: 2,
        name: 'Food',
        is_active: true
    },
    {
        id: 3,
        name: 'Computers',
        is_active: true
    },
    {
        id: 4,
        name: 'Furniture',
        is_active: true
    },
    {
        id: 5,
        name: 'Self Care',
        is_active: true
    }
];

export const brands = [
    {
        id: 1,
        name: 'Zara',
        is_active: true
    },
    {
        id: 2,
        name: 'Garnier',
        is_active: true
    },
    {
        id: 3,
        name: 'IKEA',
        is_active: true
    },
    {
        id: 4,
        name: 'Lacoste',
        is_active: true
    }
];

export const items = [
    {
        id: 1,
        name: 'Black Jeans',
        brand_id: 1,
        brand_name: 'Zara',
        category_id: 1,
        category_name: 'Clothing',
        purchase_price: 15.0,
        retail_price: 20.0,
        is_active: true
    },
    {
        id: 2,
        name: 'Facewash',
        brand_id: 2,
        brand_name: 'Garnier',
        category_id: 5,
        category_name: 'Self Care',
        purchase_price: 8.0,
        retail_price: 10.0,
        is_active: true
    },
    {
        id: 3,
        name: 'Sofa',
        brand_id: 3,
        brand_name: 'IKEA',
        category_id: 4,
        category_name: 'Furniture',
        purchase_price: 285.0,
        retail_price: 400.0,
        is_active: true
    }
];

export const stocks = [
    {
        id: 1,
        item_id: 1,
        item_name: 'Black Jeans',
        batch_no: 1,
        quantity: 50
    },
    {
        id: 2,
        item_id: 2,
        item_name: 'Facewash',
        batch_no: 2,
        quantity: 20
    },
    {
        id: 3,
        item_id: 3,
        item_name: 'Sofa',
        batch_no: 2,
        quantity: 100
    }
];

export const activities = [
    {
        id: 1,
        timestamp: '2020:23:10T11:34:23',
        message: 'Created new invoice for Customer: +924545456498'
    },
    {
        id: 2,
        timestamp: '2020:23:10T04:35:33',
        message: 'Added 100 "Sofa" to Stocks'
    },
    {
        id: 3,
        timestamp: '2020:10:23T11:34:23',
        message: 'Created new invoice for customer: +924545445298'
    }
];

export const sales = [
    {
        item_id: 1,
        item_name: 'Facewash',
        quantity: 489
    },
    {
        item_id: 1,
        item_name: 'Black Jeans',
        quantity: 300
    },
    {
        item_id: 1,
        item_name: 'Sofa',
        quantity: 134
    },
];

export const invoices = [
    {
        id: 1,
        created_at: "1/10/2011",
        customer: "+1348954450",
        amount: 454.0
    },
    {
        id: 2,
        created_at: "1/11/2011",
        customer: "+13483454450",
        amount: 234.0
    },
    {
        id: 3,
        created_at: "1/12/2011",
        customer: "+1340954450",
        amount: 98.0
    }
];

export const salesProgress = [
    {
        date: "1/10/2011",
        quantity: 23,
    },
    {
        date: "1/11/2011",
        quantity: 17,
    },
    {
        date: "1/12/2011",
        quantity: 1,
    },
    {
        date: "1/13/2011",
        quantity: 46,
    },
    {
        date: "1/14/2011",
        quantity: 19,
    },
    {
        date: "1/16/2011",
        quantity: 42,
    },
    {
        date: "1/17/2011",
        quantity: 29,
    },
    {
        date: "1/18/2011",
        quantity: 29,
    },
    {
        date: "1/19/2011",
        quantity: 8,
    },
    {
        date: "1/20/2011",
        quantity: 3,
    }
];

const categoryDistributionAmounts = [45, 23, 56, 67, 23];
export const categoryDistribution = categories.map((category, index) => {
    category.dist = categoryDistributionAmounts[index];
    return category;
});