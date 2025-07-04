import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchParams] = useSearchParams();

  const DELAY_MS = 2000;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      if (!token) {
        await delay(DELAY_MS);
        setLoading(false);
        setErrorMsg("Token verifikasi tidak ditemukan");
        return;
      }

      try {
        await axios.get("http://localhost:5009/api/Auth/verify-email", {
          params: { token },
        });
        await delay(DELAY_MS);
        navigate("/login");
      } catch (err) {
        console.error("Error verifying email:", err);
        await delay(DELAY_MS);
        setLoading(false);
        setErrorMsg(err.response?.data?.message || err.message);
      }
    };

    verify();
  }, [searchParams, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Verification Failed
        </h1>
        <p className="mb-6 text-red-500">{errorMsg}</p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        Email Verified Successfully!
      </h1>
      <p className="mb-6">
        Your email has been verified. You will be redirected to login page.
      </p>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>
    </div>
  );
};

export default VerifyEmail;
