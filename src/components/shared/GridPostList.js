import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";
const GridPostList = ({ posts, showUser = true, showStats = true, }) => {
    const { user } = useUserContext();
    return (_jsx("ul", { className: "grid-container", children: posts.map((post) => (_jsxs("li", { className: "relative min-w-80 h-80", children: [_jsx(Link, { to: `/posts/${post.$id}`, className: "grid-post_link", children: _jsx("img", { src: post.imageUrl, alt: "post", className: "h-full w-full object-cover" }) }), _jsxs("div", { className: "grid-post_user", children: [showUser && (_jsxs("div", { className: "flex items-center justify-start gap-2 flex-1", children: [_jsx("img", { src: post.creator.imageUrl ||
                                        "/assets/icons/profile-placeholder.svg", alt: "creator", className: "w-8 h-8 rounded-full" }), _jsx("p", { className: "line-clamp-1", children: post.creator.name })] })), showStats && _jsx(PostStats, { post: post, userId: user.id })] })] }, post.$id))) }));
};
export default GridPostList;
