// fuzzie-production/src/app/(main)/(pages)/dashboard/page.tsx
import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { User as PrismaUser, UserDify } from '@prisma/client';
import UserInfoDashboard from './_components/user-info-dashboard';
import DifyList from './_components/dify-list-dashboard';

interface User extends PrismaUser {
  difys: UserDify[];
}

type Props = {}

const UserInfo = async (props: Props) => {
  const user = await currentUser();
  let userInfo: User | null = null;

  if (user) {
    userInfo = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        difys: {
          include: {
            dify: true, // Ensure you include the nested relation to Dify here
          },
        },
      },
    });
    console.log(userInfo);
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>User Information</span>
      </h1>
      <UserInfoDashboard userInfo={userInfo} />
      <hr />
      <DifyList userDifys={userInfo.difys} />
    </div>
  );
}

export default UserInfo;
