type NavlinkItem = {
    name: string;
    href: string;
    children?: NavlinkItem[];
};
export const navlinks = reactive<NavlinkItem[]>([
    {
        name: "Home",
        href: "/",
    },
    {
        name: "About",
        href: "#about-us",
    },
    {
        name: "Services",
        href: "/services",
        children: [
            {
                name: "Service 1",
                href: "/services/service-1",
            },
            {
                name: "Service 2",
                href: "/services/service-2",
            },
        ],
    },
    {
        name: "Blog",
        href: "/#",
        children: [
            {
                name: "Latest Blog",
                href: "#blogs-latest",
            },
            {
                name: "Marked Blog",
                href: "#blogs-marked",
            },
        ],
    },
    {
        name: "Contact",
        href: "/contact",
    },
]);
