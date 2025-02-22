"use client";

import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";

// Customize NProgress styles
NProgress.configure({ showSpinner: false });

export default function ProgressBar() {
  const pathname = usePathname(); // Detects route changes

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 250); // Finish after a delay

    return () => {
      clearTimeout(timer);
      NProgress.done(); // Ensure it's completed
    };
  }, [pathname]); // Runs when pathname changes

  return null;
}
