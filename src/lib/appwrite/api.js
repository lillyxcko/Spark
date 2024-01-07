import { ID } from 'appwrite';
import { account, appwriteConfig, avatars, databases, storage } from './config';
// import { Query } from '@tanstack/react-query';
import { Query } from 'appwrite';
export async function createUserAccount(user) {
    try {
        const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);
        if (!newAccount)
            throw Error;
        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });
        return newUser;
    }
    catch (error) {
        console.log("Appwrite SDK error", error);
        return error;
    }
}
export async function saveUserToDB(user) {
    try {
        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), user);
        return newUser;
    }
    catch (error) {
        console.log(error);
    }
}
export async function signInAccount(user) {
    try {
        const session = await account.createEmailSession(user.email, user.password);
        return session;
    }
    catch (error) {
        console.log(error);
    }
}
export async function getAccount() {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    }
    catch (error) {
        console.log(error);
    }
}
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount)
            throw Error;
        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal("accountId", currentAccount.$id)]);
        if (!currentUser)
            throw Error;
        return currentUser.documents[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    }
    catch (error) {
        console.log(error);
    }
}
export async function createPost(post) {
    try {
        const uploadedFile = await uploadFile(post.file[0]);
        if (!uploadedFile)
            throw Error;
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
            deleteFile(uploadedFile.$id);
            throw Error;
        }
        const tags = post.tags?.replace(/ /g, '').split(',') || [];
        const newPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, ID.unique(), {
            creator: post.userId,
            caption: post.caption,
            imageUrl: fileUrl,
            imageId: uploadedFile.$id,
            location: post.location,
            tags: tags
        });
        if (!newPost) {
            await deleteFile(uploadedFile.$id);
            throw Error;
        }
        return newPost;
    }
    catch (error) {
        console.log(error);
    }
}
export async function uploadFile(file) {
    try {
        const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), file);
        return uploadedFile;
    }
    catch (error) {
        console.log(error);
    }
}
export function getFilePreview(fileId) {
    try {
        const fileurl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, "top", 100);
        return fileurl;
    }
    catch (error) {
        console.log(error);
    }
}
export async function deleteFile(fileId) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);
        return { status: "ok" };
    }
    catch (error) {
        console.log(error);
    }
}
export async function getRecentPosts() {
    const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postCollectionId, [Query.orderDesc('$createdAt'), Query.limit(20)]);
    if (!posts)
        throw Error;
    return posts;
}
export async function likePost(postId, likesArray) {
    try {
        const updatedPost = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, postId, {
            likes: likesArray
        });
        if (!updatedPost)
            throw Error;
        return updatedPost;
    }
    catch (error) {
        console.log(error);
    }
}
export async function savePost(userId, postId) {
    try {
        const updatedPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.savesCollectionId, ID.unique(), {
            user: userId,
            post: postId,
        });
        if (!updatedPost)
            throw Error;
        return updatedPost;
    }
    catch (error) {
        console.log(error);
    }
}
export async function deleteSavedPost(savedRecordId) {
    try {
        const statusCode = await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.savesCollectionId, savedRecordId);
        if (!statusCode)
            throw Error;
        return { status: "Ok" };
    }
    catch (error) {
        console.log(error);
    }
}
export async function getPostById(postId) {
    if (!postId)
        throw Error;
    try {
        const post = await databases.getDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, postId);
        if (!post)
            throw Error;
        return post;
    }
    catch (error) {
        console.log(error);
    }
}
export async function updatePost(post) {
    const hasFileToUpdate = post.file.length > 0;
    try {
        let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
        };
        if (hasFileToUpdate) {
            const uploadedFile = await uploadFile(post.file[0]);
            if (!uploadedFile)
                throw Error;
            const fileUrl = getFilePreview(uploadedFile.$id);
            if (!fileUrl) {
                deleteFile(uploadedFile.$id);
                throw Error;
            }
            image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
        }
        const tags = post.tags?.replace(/ /g, '').split(',') || [];
        const updatedPost = await databases.updateDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, post.postId, {
            caption: post.caption,
            imageUrl: image.imageUrl,
            imageId: image.imageId,
            location: post.location,
            tags: tags
        });
        if (!updatedPost) {
            await deleteFile(post.imageId);
            throw Error;
        }
        return updatedPost;
    }
    catch (error) {
        console.log(error);
    }
}
export async function deletePost(postId, imageId) {
    if (!postId || !imageId)
        throw Error;
    try {
        await databases.deleteDocument(appwriteConfig.databaseId, appwriteConfig.postCollectionId, postId);
        return { status: 'ok' };
    }
    catch (error) {
        console.log(error);
    }
}
export async function getInfinitePosts({ pageParam }) {
    const queries = [Query.orderDesc("$updatedAt"), Query.limit(9)];
    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()));
    }
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postCollectionId, queries);
        if (!posts)
            throw Error;
        return posts;
    }
    catch (error) {
        console.log(error);
    }
}
export async function searchPosts(searchTerm) {
    try {
        const posts = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.postCollectionId, [Query.search("caption", searchTerm)]);
        if (!posts)
            throw Error;
        return posts;
    }
    catch (error) {
        console.log(error);
    }
}
