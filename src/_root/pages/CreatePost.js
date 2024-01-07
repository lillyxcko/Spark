import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PostForm from '@/components/forms/PostForm';
const CreatePost = () => {
    return (_jsx("div", { className: "flex flex-1", children: _jsxs("div", { className: "common-container", children: [_jsxs("div", { className: "max-w-5xl flex-start gap-3 justify-start w-full", children: [_jsx("img", { src: "/assets/icons/add-post.svg", width: 36, height: 36, alt: "add" }), _jsx("h2", { className: "h3-bold md:h2-bold text-left w-full", children: "Create Post" })] }), _jsx(PostForm, { action: "Create" })] }) }));
};
export default CreatePost;
