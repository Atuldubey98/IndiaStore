import "./ProfilePage.css";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import useQuery from "../hooks/useQuery";
import SideMenu from "../components/SideMenu";
import ContactInfo from "../components/ContactInfo";
import { Button } from "@mui/material";

const ProfilePage = () => {
  const query = useQuery();
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    document.title = "India Store - Profile";
  }, []);
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (addresses.length < 5) {
      setAddresses((a) => [...a, addresses.length + 1]);
    }
  };
  const handleDeleteAddress = (e, add) => {
    e.preventDefault();
    if (addresses.length > 0) {
      setAddresses((a) => {
        return a.filter((address) => address !== add);
      });
    }
  };
  return (
    <div className="profile__page">
      <Header />
      {query.has("sidemenu") && <SideMenu />}
      <div className="profile__area">
        <div className="profile">
          <img
            src="images/profile.webp"
            alt="profilepic"
            className="profile__pic"
          />
        </div>
        <div className="profile__infomation">
          <form className="profile__form">
            <span className="profile__head">Personnel Information</span>
            <div className="form__field">
              <div className="first__name">
                <label htmlFor="first-name">First :</label>
                <input type="text" name="first-name" placeholder="First Name" />
              </div>
              <div className="last__name">
                <label htmlFor="last-name">Last :</label>
                <input type="text" name="last-name" placeholder="Last Name" />
              </div>
            </div>
            <div className="profile__addresses">
              <span className="profile__head"> Address Information </span>
              <i>(Max 5 addreses)</i>
              {addresses.map((address) => (
                <ContactInfo
                  key={address}
                  address={address}
                  handleDeleteAddress={handleDeleteAddress}
                />
              ))}
              <Button
                onClick={handleAddAddress}
                variant="contained"
                color="secondary"
                className="profile__addressAdd"
                disabled={addresses.length === 5}
              >
                Add
              </Button>
            </div>
            <Button color="success" variant="contained" type="submit">
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
