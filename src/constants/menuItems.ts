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
        title: 'Categories',
        path: '/manage-category',
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
        title: 'Manage Shop',
        path: '/manage-shop',
        access: "Vendor",
    },
    {
        title: 'My Order',
        path: '/my-order',
        access: "Customer",
    },
    {
        title: 'My Shop Order',
        path: '/my-shop-order',
        access: "Vendor",
    },
]