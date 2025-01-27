import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppRootStateType } from "../../redux/store";
import { Post } from "./Post";
import { useEffect, useMemo } from "react";
import { postsRequest } from "../../redux/reducers/postsReducer";
import { Card, Pagination } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const Posts = () => {
    const { postsPerPage, totalPostsCount } = useSelector((state: AppRootStateType) => state.posts);
    const { posts } = useSelector((state: AppRootStateType) => state.posts);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { page = '1' } = useParams()


    const currentPage = useMemo(() => {
        return parseInt(page) || 1
    }, [page])

    const changePageHandler = (page: number
    ) => {
        navigate(`/posts/${page}`)
    }

    useEffect(() => {
        dispatch(postsRequest(currentPage));
    }, [dispatch, currentPage]);

    return (
        <Card>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((p) => <Post key={p.id} post={p} />)
            ) : (
                <p>Нет постов для отображения</p>
            )}

            <Pagination
                current={currentPage}
                total={totalPostsCount}
                pageSize={postsPerPage}
                onChange={changePageHandler}
            />
        </Card>
    )
}