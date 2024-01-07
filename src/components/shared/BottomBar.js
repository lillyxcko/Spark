import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { bottombarLinks } from '@/constants';
import { Link, useLocation } from 'react-router-dom';
const BottomBar = () => {
    const { pathname } = useLocation();
    return (_jsx("section", { className: "bottom-bar", children: bottombarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (_jsxs(Link, { to: link.route, className: ` ${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`, children: [_jsx("img", { src: link.imgURL, alt: link.label, width: 16, height: 16, className: `${isActive && 'invert-white'}` }), _jsx("p", { className: "tiny-medium text-light-2", children: link.label })] }, link.label));
        }) }));
};
export default BottomBar;
