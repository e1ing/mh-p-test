import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppRootStateType } from "../../redux/store";
import { Post } from "./Post";
import { useEffect } from "react";
import { postsRequest } from "../../redux/reducers/postsReducer";
import { Card, Pagination } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

export const Posts = () => {
    const { posts,
        postsPerPage,
        totalPostsCount } = useSelector((state: AppRootStateType) => state.posts);
    //@ts-ignore
    const _posts = posts.posts;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const changePageHandler = (page: number
    ) => {
        navigate(`${location.pathname}?page=${page}`)
    }
    const searchParams = new URLSearchParams(location.search)
    const searchPage = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        dispatch(postsRequest(searchPage));
    }, [dispatch, searchPage]);

    return (
        <Card>
            {Array.isArray(_posts) && _posts.length > 0 ? (
                _posts.map((p) => <Post key={p.id} post={p} />)
            ) : (
                <p>Нет постов для отображения</p>
            )}

            <Pagination
                current={searchPage}
                total={totalPostsCount}
                pageSize={postsPerPage}
                onChange={changePageHandler}
            />
        </Card>
    )
}