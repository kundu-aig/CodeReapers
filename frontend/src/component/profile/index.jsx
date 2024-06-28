import { useRouter } from "next/router";
import { Card, DropdownButton, Dropdown } from "react-bootstrap";

const Profile = () => {
  const router = useRouter();

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log("userData", userData);
  // Logout function
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <Card style={{ display: "inline-block", padding: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "grey",
              borderRadius: "50%",
              backgroundImage: userData
                ? `url(${userData?.logo?.url})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <span>
            {userData
              ? `${userData?.firstName} ${userData?.lastName ?? ""}`
              : "User"}
          </span>
        </div>

        {userData?.lob && (
          <span
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              // backgroundColor: "#e0e0e0",
              borderRadius: "10px",
              fontSize: "12px",
            }}
          >
            {userData?.lob}
          </span>
        )}

        <DropdownButton
          id="dropdown-basic-button"
          title=""
          align="end"
          variant="secondary"
          size="sm"
          style={{ marginLeft: "10px" }}
        >
          <Dropdown.Item href="/updateProfile">Update Profile</Dropdown.Item>
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </DropdownButton>
      </div>
    </Card>
  );
};

export default Profile;
