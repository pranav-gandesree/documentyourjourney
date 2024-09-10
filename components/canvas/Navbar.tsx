'use client'


import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <div className="text-lg font-bold">
        <Link href="/">MyApp</Link>
      </div>
      <div className="flex items-center space-x-4">
        {status === 'authenticated' ? (
          <>
            <img
              src={session?.user?.image || ''}
              alt="User Image"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{session?.user?.name}</span> {/* Show user name */}
            <span className="text-sm">{session?.user?.email}</span> {/* Show user email */}
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded text-white"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded text-white"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
