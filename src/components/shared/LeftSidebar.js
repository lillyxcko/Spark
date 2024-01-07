import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
const LeftSidebar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { pathname } = useLocation();
    useEffect(() => {
        if (isSuccess)
            navigate(0);
    });
    return (_jsxs("nav", { className: "leftsidebar", children: [_jsxs("div", { className: "flex flex-col gap-11", children: [_jsx(Link, { to: "/", className: "flex gap-3 items-center", children: _jsx("img", { src: "/assets/images/Spark.svg", alt: "logo", width: 130, height: 325 }) }), _jsxs(Link, { to: '/profile/${user.id}', className: "flex gap-3 items-center", children: [_jsx("img", { src: user.imageUrl || "/assets/icons/profile-placeholder.svg", alt: "profile", className: "h-14 w-14 rounded-full" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("p", { className: "body-bold", children: user.name }), _jsxs("p", { className: "small-regular text-light-3", children: ["@", user.username] })] })] }), _jsx("ul", { className: "flex flex-col gap-6", children: sidebarLinks.map((link) => {
                            const isActive = pathname === link.route;
                            return (_jsx("li", { className: `leftsidebar-link group ${isActive && 'bg-primary-500'}`, children: _jsxs(NavLink, { to: link.route, className: "flex gap-4 items-center p-4", children: [_jsx("img", { src: link.imgURL, alt: link.label, className: `group-hover:invert-white ${isActive && 'invert-white'}` }), link.label] }) }, link.label));
                        }) })] }), _jsxs(Button, { variant: "ghost", className: "shad-button_ghost", onClick: () => signOut(), children: [_jsx("img", { src: "/assets/icons/logout.svg", alt: "logout" }), _jsx("p", { className: "small-medium lg:base-medium", children: "Logout" })] })] }));
};
export default LeftSidebar;
