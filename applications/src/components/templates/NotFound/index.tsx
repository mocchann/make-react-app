import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = (): JSX.Element => {
  const history = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      history("/");
    }, 3000);

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [history]);

  return <p>404 Page Not Found</p>;
};
