import { useRouter } from "next/router";
import React from "react";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";

const Profile = () => {
  const router = useRouter();
  const logout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <Card style={{ display: "inline-block", padding: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>UserName</span>
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "grey",
            borderRadius: "50%",
            display: "inline-block",
            marginLeft: "10px",
          }}
        ></div>
        <DropdownButton
          id="dropdown-basic-button"
          title=""
          align="end"
          variant="secondary"
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
