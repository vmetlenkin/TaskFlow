import React from 'react';
import Link from 'next/link';
import Button from "./Button";
import {useAppSelector} from "../../redux/hooks";
import {destroyCookie} from "nookies";
import {useRouter} from "next/router";

const Navbar = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.data);
  
  const logout = () => {
    destroyCookie(null, 'token');
    router.push('/login');
  }
  
  return (
    <nav className="bg-white dark:bg-transparent dark:backdrop-blur-md sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0 border-gray-100">
      <div className="container flex flex-wrap items-center justify-between mx-auto px-4">
        <Link href="/projects" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">TaskFlow</span>
        </Link>
        <div className="flex md:order-2 items-center">
          <div className="mr-5">
            {user.firstName} {user.lastName} ({user.email})
          </div>
          <Button onClick={logout}>Выйти</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;