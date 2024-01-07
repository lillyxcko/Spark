import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
const SigninForm = () => {
    const { toast } = useToast();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const navigate = useNavigate();
    const { mutateAsync: signInAccount } = useSignInAccount();
    // 1. Define your form.
    const form = useForm({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    // 2. Define a submit handler.
    async function onSubmit(values) {
        const session = await signInAccount({
            email: values.email,
            password: values.password,
        });
        if (!session) {
            return toast({ variant: "destructive", title: 'Sign in failed. Please try again.' });
        }
        const isLoggedIn = await checkAuthUser();
        console.log({ isLoggedIn });
        if (isLoggedIn) {
            form.reset();
            navigate('/');
        }
        else {
            return toast({ variant: "destructive", title: 'Sign up failed. Please try again.' });
        }
    }
    return (_jsx(Form, { ...form, children: _jsxs("div", { className: "sm:w-420 flex-center flex-col", children: [_jsx("img", { src: "/assets/images/Spark.svg" }), _jsx("h2", { className: "h3-bold md:h2-bold pt-5 sm:pt-12", children: "Log in to your account" }), _jsx("p", { className: "text-light-3 small-medium md:base-regular mt-2", children: "Welcome back! Please enter your login details." }), _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-5 w-full mt-4", children: [_jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { type: "email", className: "shad-input", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Password" }), _jsx(FormControl, { children: _jsx(Input, { type: "password", className: "shad-input", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", className: "shad-button_primary", children: isUserLoading ? (_jsxs("div", { className: "flex-center gap-2", children: [_jsx(Loader, {}), " Loading..."] })) : "Sign in" }), _jsxs("p", { className: "text-small-regular text-light-2 text-center mt-2", children: ["Don't have an account? ", _jsx(Link, { to: "/sign-up", className: "text-primary-500 text-small-semibold ml-1", children: "Sign up" })] })] })] }) }));
};
export default SigninForm;
