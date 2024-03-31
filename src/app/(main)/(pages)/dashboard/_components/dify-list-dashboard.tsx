import React from 'react';
import { Dify, UserDify } from '@prisma/client';

type DifyListProps = {
    userDifys: UserDify[];
};

const DifyList: React.FC<DifyListProps> = ({ userDifys }) => {
    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Your Dify Agents</h3>
            {userDifys.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userDifys.map((userDify) => (
                        <div key={userDify.difyId} className="border p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <h4 className="text-lg font-medium">{userDify.dify.name}</h4>
                                {userDify.dify.image && (
                                    <img
                                        src={userDify.dify.image}
                                        alt={userDify.dify.name}
                                        className="h-12 w-12 object-cover rounded-full"
                                    />
                                )}
                            </div>
                            {userDify.dify.description && <p className="mt-2">{userDify.dify.description}</p>}
                            <ul className="mt-4">
                                <li>Base URL: {userDify.dify.baseUrl}</li>
                                <li>Cost Type: {userDify.dify.costType.join(', ')}</li>
                                <li>Language: {userDify.dify.language}</li>
                                <li>
                                    Multimodal: {userDify.dify.multimodal ? 'Supported' : 'Not Supported'}
                                </li>
                                <li>
                                    Speech: {userDify.dify.speech ? 'Supported' : 'Not Supported'}
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <div>You do not have any Dify agents.</div>
            )}
        </div>
    );
};

export default DifyList;
