import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CustomJwtPayload } from "../../types";
import { jwtDecode } from "jwt-decode";

const ProtectedPage = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  let decoded;
  const token = localStorage.getItem("token");
  if (token) {
    decoded = jwtDecode(token) as CustomJwtPayload;
    
  }

  useEffect(() => {
    setLoading(false);
  }, [token]);
  if (loading) {
    return (
      <button type="button" className="bg-primary" disabled>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
        Loading...
      </button>
    );
  }

  if (decoded && (Number(decoded.exp!*1000) > Date.now())) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedPage;
