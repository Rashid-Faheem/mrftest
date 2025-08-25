"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useSession() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = () => {
      const sessionStr = localStorage.getItem("session");
      if (!sessionStr) {
        router.push("/login");
        return;
      }

      const session = JSON.parse(sessionStr);
      if (Date.now() > session.expiresAt) {
        // session expired
        localStorage.removeItem("session");
        router.push("/login");
      }
    };

    const resetExpiry = () => {
      const sessionStr = localStorage.getItem("session");
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        session.expiresAt = Date.now() + 2 * 60 * 60 * 1000; // 2 more hours
        localStorage.setItem("session", JSON.stringify(session));
      }
    };

    // run once when component mounts
    checkSession();

    // re-check every minute
    const interval = setInterval(checkSession, 60 * 1000);

    // listen for user activity to reset expiry
    ["click", "mousemove", "keypress"].forEach((event) =>
      window.addEventListener(event, resetExpiry)
    );

    return () => {
      clearInterval(interval);
      ["click", "mousemove", "keypress"].forEach((event) =>
        window.removeEventListener(event, resetExpiry)
      );
    };
  }, [router]);
}
