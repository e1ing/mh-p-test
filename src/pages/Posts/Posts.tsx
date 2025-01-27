import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppRootStateType } from "../../redux/store";
import { Post } from "./Post";
import { useEffect } from "react";
import { postsRequest } from "../../redux/reducers/postsReducer";

export const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: AppRootStateType) => state.posts.posts);

    useEffect(() => {
        dispatch(postsRequest());
    }, [dispatch]);


    return (
        <>
            {
                posts && posts.map(p => <Post post={p} />)
            }
        </>
    )
}