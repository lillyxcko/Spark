export var QUERY_KEYS;
(function (QUERY_KEYS) {
    // AUTH KEYS
    QUERY_KEYS["CREATE_USER_ACCOUNT"] = "createUserAccount";
    // USER KEYS
    QUERY_KEYS["GET_CURRENT_USER"] = "getCurrentUser";
    QUERY_KEYS["GET_USERS"] = "getUsers";
    QUERY_KEYS["GET_USER_BY_ID"] = "getUserById";
    // POST KEYS
    QUERY_KEYS["GET_POSTS"] = "getPosts";
    QUERY_KEYS["GET_INFINITE_POSTS"] = "getInfinitePosts";
    QUERY_KEYS["GET_RECENT_POSTS"] = "getRecentPosts";
    QUERY_KEYS["GET_POST_BY_ID"] = "getPostById";
    QUERY_KEYS["GET_USER_POSTS"] = "getUserPosts";
    QUERY_KEYS["GET_FILE_PREVIEW"] = "getFilePreview";
    //  SEARCH KEYS
    QUERY_KEYS["SEARCH_POSTS"] = "getSearchPosts";
})(QUERY_KEYS || (QUERY_KEYS = {}));
