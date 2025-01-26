import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileRequest, ProfileState } from '../../redux/reducers/profileReducer';

export const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: ProfileState) => state.profile);

    useEffect(() => {
        dispatch(profileRequest());
    }, [dispatch]);


    return (
        <div >
            {/* {profile} */}
        </div>
    );
}

