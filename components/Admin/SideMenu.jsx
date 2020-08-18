import React from "react";
import { useRouter } from "next/router";

export default function SideMenu() {
  const router = useRouter();
  return (
    <ul className="settings-menu">
      <li onClick={() => router.push("/admin/")}>Home</li>
      <li onClick={() => router.push("/admin/combos")}>Combos</li>
      <li onClick={() => router.push("/admin/posts")}>Posts</li>
      <li onClick={() => router.push("/admin/characters")}>Characters</li>
      <li onClick={() => router.push("/admin/games")}>Games</li>
      <li onClick={() => router.push("/admin/users")}>Users</li>
    </ul>
  );
}
