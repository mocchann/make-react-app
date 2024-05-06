import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return <p>404 Page Not Found</p>;
};
