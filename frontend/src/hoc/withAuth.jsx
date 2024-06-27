import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent, allowedUserTypes) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userType = userData?.userType;

      if (!allowedUserTypes.includes(userType)) {
        Router.replace("/login");
      } else {
        setVerified(true);
      }
    }, []);

    if (!verified) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
