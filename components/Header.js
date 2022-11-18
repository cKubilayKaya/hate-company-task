import Link from "next/link";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";

export default function Header() {
  console.log("test");
  return (
    <header className="header">
      <Link href="/" className="logo">
        <AiFillInstagram color="fff" size={36} />
      </Link>
      <div className="header-auth-buttons">
        <Link href="/">
          <button>Signin</button>
        </Link>
        <Link href="/">
          <button>Signup</button>
        </Link>
      </div>
    </header>
  );
}
