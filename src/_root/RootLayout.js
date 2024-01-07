import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import BottomBar from '@/components/shared/BottomBar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Topbar from '@/components/shared/Topbar';
import { Outlet } from 'react-router-dom';
const RootLayout = () => {
    return (_jsxs("div", { className: "w-full md:flex", children: [_jsx(Topbar, {}), _jsx(LeftSidebar, {}), _jsx("section", { className: "flex flex-1 h-full", children: _jsx(Outlet, {}) }), _jsx(BottomBar, {})] }));
};
export default RootLayout;
