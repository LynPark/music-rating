import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h2>User Profile</h2>
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Profile;