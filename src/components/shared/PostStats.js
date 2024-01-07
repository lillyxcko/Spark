import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { useState, useEffect } from "react";
import { checkIsLiked } from "@/lib/utils";
import Loader from "./Loader";
const PostStats = ({ post, userId }) => {
    const likesList = post.likes.map((user) => user.$id);
    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);
    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSavingPost } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost();
    const { data: currentUser } = useGetCurrentUser();
    const savedPostRecord = currentUser?.save.find((record) => record.post.$id === post.$id);
    useEffect(() => {
        setIsSaved(savedPostRecord ? true : false);
    }, [currentUser]);
    const handleLikePost = (e) => {
        e.stopPropagation();
        let newLikes = [...likes];
        const hasLiked = newLikes.includes(userId);
        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId);
        }
        else {
            newLikes.push(userId);
        }
        setLikes(newLikes);
        likePost({ postId: post.$id, likesArray: newLikes });
    };
    const handleSavePost = (e) => {
        e.stopPropagation();
        console.log({ isSaved, savedPostRecord });
        if (savedPostRecord) {
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id);
        }
        else {
            savePost({ postId: post.$id, userId });
            setIsSaved(true);
        }
    };
    return (_jsxs("div", { className: "flex justify-between items-center z-20", children: [_jsxs("div", { className: "flex gap-2 mr-5", children: [_jsx("img", { src: checkIsLiked(likes, userId)
                            ? "/assets/icons/liked.svg"
                            : "/assets/icons/like.svg", alt: "like", width: 20, height: 20, onClick: handleLikePost, className: "cursor-pointer" }), _jsx("p", { className: "small-medium lg:base-medium", children: likes.length })] }), _jsx("div", { className: "flex gap-2 mr-5", children: isSavingPost || isDeletingSaved ? _jsx(Loader, {}) : _jsx("img", { src: isSaved
                        ? "/assets/icons/saved.svg"
                        : "/assets/icons/save.svg", alt: "like", width: 20, height: 20, onClick: handleSavePost, className: "cursor-pointer" }) })] }));
};
export default PostStats;
