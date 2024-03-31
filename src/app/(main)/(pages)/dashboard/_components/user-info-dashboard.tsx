import React from 'react';
import { User } from '@prisma/client';

type UserInfoDashboardProps = {
    userInfo: User | null;
};

const UserInfoDashboard: React.FC<UserInfoDashboardProps> = ({ userInfo }) => {
    if (!userInfo) {
        return <div>No user information to display.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="flex items-center space-x-4">
                <img
                    src={userInfo.profileImage || '/default-profile.png'}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">{userInfo.name}</span>
                    <span className="text-sm text-gray-600">{userInfo.email}</span>
                </div>
            </div>
            <div className="mt-4 p-4 border-t w-full">
                <h3 className="text-lg font-medium">Account Details</h3>
                <ul>
                    <li>Tier: {userInfo.tier}</li>
                    <li>Credits: {userInfo.credits}</li>
                    {/* Render additional user details as needed */}
                    <li>Member since: {new Date(userInfo.createdAt).toLocaleDateString()}</li>
                    <li>Last updated: {new Date(userInfo.updatedAt).toLocaleDateString()}</li>
                </ul>
            </div>
            {/* Conditionally render sections for DiscordWebhooks, Notions, etc., if needed */}
        </div>
    );
};

export default UserInfoDashboard;
