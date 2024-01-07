import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, Navigate } from 'react-router-dom';
const AuthLayout = () => {
    const isAuthenticated = false;
    return (_jsx(_Fragment, { children: isAuthenticated ? (_jsx(Navigate, { to: "/" })) : (_jsxs(_Fragment, { children: [_jsx("section", { className: "flex flex-1 justify-center items-center flex-col py-10", children: _jsx(Outlet, {}) }), _jsx("img", { src: "/assets/images/side-image.jpg", alt: "logo", className: "hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" })] })) }));
};
export default AuthLayout;
