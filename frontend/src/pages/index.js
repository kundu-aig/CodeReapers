// import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
// import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user data is present in localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleDashboardRedirect = () => {
    if (user?.userType === "market") {
      router.push("/dashboard/market");
    } else if (user?.userType === "agent") {
      router.push("/dashboard/agent");
    }
  };
  return (
    <>
      <main className={`container-md ${inter.className}`}>
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center vh-100">
          <div className="mb-4 mb-md-0 me-md-4">
            <img height={200} src="/home.svg" alt="Hero Image" />
          </div>
          <div className="d-flex flex-column align-items-center">
            <h1 className="text-center mb-4">TailorMade for Success</h1>

            {user ? (
              <button
                type="button"
                className="btn btn-primary mb-2 mb-md-0 me-md-2"
                onClick={handleDashboardRedirect}
              >
                Dashboard
              </button>
            ) : (
              <div className="d-flex flex-column flex-md-row">
                <Link
                  className="btn btn-primary mb-2 mb-md-0 me-md-2"
                  href="/login"
                >
                  Login
                </Link>
                <Link className="btn btn-secondary" href="/signup">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
