import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GridPostList from "@/components/shared/GridPostList";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const SearchResults = ({ isSearchFetching, searchedPosts }) => {
    if (isSearchFetching) {
        return _jsx(Loader, {});
    }
    else if (searchedPosts && searchedPosts.documents.length > 0) {
        return _jsx(GridPostList, { posts: searchedPosts.documents });
    }
    else {
        return (_jsx("p", { className: "text-light-4 mt-10 text-center w-full", children: "No results found" }));
    }
};
const Explore = () => {
    const { ref, inView } = useInView();
    const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue, 500);
    const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);
    useEffect(() => {
        if (inView && !searchValue) {
            fetchNextPage();
        }
    }, [inView, searchValue]);
    if (!posts)
        return (_jsx("div", { className: "flex-center w-full h-full", children: _jsx(Loader, {}) }));
    const shouldShowSearchResults = searchValue !== "";
    const shouldShowPosts = !shouldShowSearchResults &&
        posts.pages.every((item) => item.documents.length === 0);
    return (_jsxs("div", { className: "explore-container", children: [_jsxs("div", { className: "explore-inner_container", children: [_jsx("h2", { className: "h3-bold md:h2-bold w-full", children: "Search Posts" }), _jsxs("div", { className: "flex gap-1 px-4 w-full rounded-lg bg-dark-4", children: [_jsx("img", { src: "/assets/icons/search.svg", width: 24, height: 24, alt: "search" }), _jsx(Input, { type: "text", placeholder: "Search", className: "explore-search", value: searchValue, onChange: (e) => {
                                    const { value } = e.target;
                                    setSearchValue(value);
                                } })] })] }), _jsxs("div", { className: "flex-between w-full max-w-5xl mt-16 mb-7", children: [_jsx("h3", { className: "body-bold md:h3-bold", children: "Popular Today" }), _jsxs("div", { className: "flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer", children: [_jsx("p", { className: "small-medium md:base-medium text-light-2", children: "All" }), _jsx("img", { src: "/assets/icons/filter.svg", width: 20, height: 20, alt: "filter" })] })] }), _jsx("div", { className: "flex flex-wrap gap-9 w-full max-w-5xl", children: shouldShowSearchResults ? (_jsx(SearchResults, { isSearchFetching: isSearchFetching, searchedPosts: searchedPosts })) : shouldShowPosts ? (_jsx("p", { className: "text-light-4 mt-10 text-center w-full", children: "End of posts" })) : (posts.pages.map((item, index) => (_jsx(GridPostList, { posts: item.documents }, `page-${index}`)))) }), hasNextPage && !searchValue && (_jsx("div", { ref: ref, className: "mt-10", children: _jsx(Loader, {}) }))] }));
};
export default Explore;
