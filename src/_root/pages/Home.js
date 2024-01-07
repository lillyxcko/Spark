import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
const Home = () => {
    const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
    return (_jsx("div", { className: "flex flex-1", children: _jsx("div", { className: "home-container", children: _jsxs("div", { className: "home-posts", children: [_jsx("h2", { className: "h3-bold md:h2-bold text-left w-full", children: " Home Feed " }), isPostLoading && !posts ? (_jsx(Loader, {})) : (_jsx("ul", { className: "flex flex-col flex-1 gap-9 w-full", children: posts?.documents.map((post) => (_jsx(PostCard, { post: post }, post.caption))) }))] }) }) }));
};
export default Home;
