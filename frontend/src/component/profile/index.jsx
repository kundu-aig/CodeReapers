import { useRouter } from "next/router";
import { Card, DropdownButton, Dropdown } from "react-bootstrap";

const Profile = () => {
  const router = useRouter();

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  // Logout function
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <Card style={{ display: "inline-block", padding: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Display username (first name + last name) */}
        <span>
          {userData
            ? `${userData?.firstName} ${userData?.lastName ?? ""}`
            : "User"}
        </span>
        {/* Display user photo */}
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "grey",
            borderRadius: "50%",
            display: "inline-block",
            marginLeft: "10px",
            backgroundImage: userData ? `url(${userData.photo})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Dropdown for settings and logout */}
        <DropdownButton
          id="dropdown-basic-button"
          title=""
          align="end"
          variant="secondary"
          size="sm"
          style={{ marginLeft: "10px" }}
        >
          <Dropdown.Item href="/updateProfile">Settings</Dropdown.Item>
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </DropdownButton>
      </div>
    </Card>
  );
};

export default Profile;
