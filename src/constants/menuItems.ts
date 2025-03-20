export const menuItems:{title: string;path: string, access: string}[] = [
    {
        title: 'Home',
        path: '/',
        access: "public",
    },
    {
        title: 'Products',
        path: '/products',
        access: "public",
    },
    {
        title: 'Shops',
        path: '/shops',
        access: "public",
    },
    {
        title: 'About Ecohub',
        path: '/about',
        access: "public",
    },
    {
        title: 'Contact',
        path: '/contact',
        access: "public",
    },
    {
        title: 'Categories',
        path: '/manage-category',
        access: "Admin",
    },
    {
        title: 'Coupons',
        path: '/manage-coupon',
        access: "Admin",
    },
    {
        title: 'Manage Users',
        path: '/manage-users',
        access: "Admin",
    },
    {
        title: 'Manage Shops',
        path: '/manage-shops',
        access: "Admin",
    },
    {
        title: 'Manage Shop Products',
        path: '/manage-shop',
        access: "Vendor",
    },
    {
        title: 'My Shop',
        path: '/my-shop',
        access: "Vendor",
    },
    {
        title: 'My Order',
        path: '/my-order',
        access: "Customer",
    },
    {
        title: 'Order To Recieve',
        path: '/my-order-to-recieve',
        access: "Customer",
    },
    {
        title: 'My Cancelled Order',
        path: '/my-cancelled-order',
        access: "Customer",
    },
    {
        title: 'My Transaction',
        path: '/my-transaction',
        access: "Customer",
    },
    {
        title: 'My Shop Order',
        path: '/my-shop-order',
        access: "Vendor",
    },
    {
        title: 'Order To Deliver',
        path: '/my-shop-order-to-deliver',
        access: "Vendor",
    },
    {
        title: 'Cancelled Order History',
        path: '/my-shop-cancelled-order',
        access: "Vendor",
    },
    {
        title: 'My Shop Transaction',
        path: '/my-shop-transaction',
        access: "Vendor",
    },
]