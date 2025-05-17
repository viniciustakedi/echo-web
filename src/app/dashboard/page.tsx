"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

const DashboardPage = () => {
  const { status } = useSession({ required: true });

  if (status === "loading") return <p>Loading…</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <div style={{ marginTop: "20px" }}>
        <button style={{ padding: "10px 20px", cursor: "pointer" }}>
          Action 1
        </button>
        <button
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          Action 2
        </button>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
};

export default DashboardPage;
