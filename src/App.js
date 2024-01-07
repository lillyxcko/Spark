import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster";
const App = () => {
    return (_jsxs("main", { className: "flex h-screen", children: [_jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(AuthLayout, {}), children: [_jsx(Route, { path: "/sign-in", element: _jsx(SigninForm, {}) }), _jsx(Route, { path: "/sign-up", element: _jsx(SignupForm, {}) })] }), _jsxs(Route, { element: _jsx(RootLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "/explore", element: _jsx(Explore, {}) }), _jsx(Route, { path: "/saved", element: _jsx(Saved, {}) }), _jsx(Route, { path: "/all-users", element: _jsx(AllUsers, {}) }), _jsx(Route, { path: "/create-post", element: _jsx(CreatePost, {}) }), _jsx(Route, { path: "/update-post/:id", element: _jsx(EditPost, {}) }), _jsx(Route, { path: "/posts/:id", element: _jsx(PostDetails, {}) }), _jsx(Route, { path: "/profile/:id/*", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/update-profile/:id", element: _jsx(UpdateProfile, {}) })] })] }), _jsx(Toaster, {})] }));
};
export default App;
