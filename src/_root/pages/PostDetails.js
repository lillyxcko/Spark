import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetPostById, } from "@/lib/react-query/queriesAndMutations";
import { formatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import PostStats from "@/components/shared/PostStats";
const PostDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: post, isLoading } = useGetPostById(id || '');
    const { user } = useUserContext();
    const handleDeletePost = () => {
    };
    return (_jsxs("div", { className: "post_details-container", children: [_jsx("div", { className: "hidden md:flex max-w-5xl w-full", children: _jsxs(Button, { onClick: () => navigate(-1), variant: "ghost", className: "shad-button_ghost", children: [_jsx("img", { src: "/assets/icons/back.svg", alt: "back", width: 24, height: 24 }), _jsx("p", { className: "small-medium lg:base-medium", children: "Back" })] }) }), isLoading || !post ? (_jsx(Loader, {})) : (_jsxs("div", { className: "post_details-card", children: [_jsx("img", { src: post?.imageUrl, alt: "post", className: "post_details-img" }), _jsxs("div", { className: "post_details-info", children: [_jsxs("div", { className: "flex-between w-full", children: [_jsxs(Link, { to: `/profile/${post?.creator.$id}`, className: "flex items-center gap-3", children: [_jsx("img", { src: post?.creator.imageUrl ||
                                                    "/assets/icons/profile-placeholder.svg", alt: "creator", className: "w-8 h-8 lg:w-12 lg:h-12 rounded-full" }), _jsxs("div", { className: "flex gap-1 flex-col", children: [_jsx("p", { className: "base-medium lg:body-bold text-light-1", children: post?.creator.name }), _jsxs("div", { className: "flex-center gap-2 text-light-3", children: [_jsx("p", { className: "subtle-semibold lg:small-regular ", children: formatDateString(post?.$createdAt) }), "\u2022", _jsx("p", { className: "subtle-semibold lg:small-regular", children: post?.location })] })] })] }), _jsxs("div", { className: "flex-center gap-4", children: [_jsx(Link, { to: `/update-post/${post?.$id}`, className: `${user.id !== post?.creator.$id && "hidden"}`, children: _jsx("img", { src: "/assets/icons/edit.svg", alt: "edit", width: 24, height: 24 }) }), _jsx(Button, { onClick: handleDeletePost, variant: "ghost", className: `ghost_details-delete_btn ${user.id !== post?.creator.$id && "hidden"}`, children: _jsx("img", { src: "/assets/icons/delete.svg", alt: "delete", width: 24, height: 24 }) })] })] }), _jsx("hr", { className: "border w-full border-dark-4/80" }), _jsxs("div", { className: "flex flex-col flex-1 w-full small-medium lg:base-regular", children: [_jsx("p", { children: post?.caption }), _jsx("ul", { className: "flex gap-1 mt-2", children: post?.tags.map((tag, index) => (_jsxs("li", { className: "text-light-3 small-regular", children: ["#", tag] }, `${tag}${index}`))) })] }), _jsx("div", { className: "w-full", children: _jsx(PostStats, { post: post, userId: user.id }) })] })] }))] }));
};
export default PostDetails;
