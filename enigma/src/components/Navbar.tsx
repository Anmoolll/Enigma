'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const user : User = session?.user as User;
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ redirect: false });
      router.replace('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogin = () => {
    setIsLoggingIn(true);
    router.push('/sign-in');
  };

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold mb-4 md:mb-0">
          Enigma
        </Link>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.username || user?.email}
            </span>
            <Button 
              onClick={handleLogout} 
              className="w-full md:w-auto bg-slate-100 text-black" 
              variant='outline'
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                'Logout'
              )}
            </Button>
          </>
        ) : (
          <Button 
            onClick={handleLogin}
            className="w-full md:w-auto bg-slate-100 text-black" 
            variant='outline'
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting...
              </>
            ) : (
              'Login'
            )}
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;