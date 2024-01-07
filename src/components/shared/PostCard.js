import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUserContext } from "@/context/AuthContext";
import { formatDateString } from "@/lib/utils";
import { Link } from 'react-router-dom';
import PostStats from "./PostStats";
const PostCard = ({ post }) => {
    const { user } = useUserContext();
    if (!post.creator)
        return;
    return (_jsxs("div", { className: "post-card", children: [_jsxs("div", { className: "flex-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Link, { to: `/profile/${post.creator.$id}`, children: _jsx("img", { src: post?.creator?.imageUrl || '/assets/icons/icons/profile-placeholder.svg', alt: 'creator', className: "rounded-full w-12 lg:h-12" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("p", { className: "base-medium lg:body-bold text-light-1", children: post.creator.name }), _jsxs("div", { className: "flex-center gap-2 text-light-3", children: [_jsx("p", { className: "subtle-semibold lg:small-regular", children: formatDateString(post.$createdAt) }), "\u2022", _jsx("p", { className: "subtle-semibold lg:small-regular", children: post.location })] })] })] }), _jsx(Link, { to: `/update-post/${post.$id}`, className: `${user.id !== post.creator.$id && "hidden"}`, children: _jsx("img", { src: "/assets/icons/edit.svg", alt: "edit", width: 20, height: 20 }) })] }), _jsxs(Link, { to: `/posts/${post.$id}`, children: [_jsxs("div", { className: "small-medium lg:base-medium py-5", children: [_jsx("p", { children: post.caption }), _jsx("ul", { className: "flex gap-1 mt-2", children: post.tags.map((tag) => (_jsxs("li", { className: "text-light-3", children: ["#", tag] }, tag))) })] }), _jsx("img", { src: post.imageUrl || '/assets/icons/profile-placeholder.svg', className: "post-card_img", alt: "post image" })] }), _jsx(PostStats, { post: post, userId: user.id })] }));
};
export default PostCard;
