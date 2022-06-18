import { Close } from "@material-ui/icons";
import { IconButton } from "@mui/material";
import React from "react";
import "./ContactInfo.css";
const ContactInfo = ({ address, handleDeleteAddress }) => {
  return (
    <div className="contact__info">
      <div className="contact__infoBtn">
        <IconButton onClick={(e) => handleDeleteAddress(e, address)}>
          <Close />
        </IconButton>
      </div>
      <div className="form__field">
        <label htmlFor="first-name">Name</label>
        <input type="text" name="first-name" placeholder="Name" />
      </div>
      <div className="form__field">
        <label htmlFor="first-name">Address Line 1 :</label>
        <input type="text" name="first-name" placeholder="Address Line 1" />
      </div>
      <div className="form__field">
        <label htmlFor="first-name">Address Line 2</label>
        <input type="text" name="first-name" placeholder="Address Line 2" />
      </div>
      <div className="form__field">
        <label htmlFor="first-name">City</label>
        <input type="text" name="first-name" placeholder="City" />
      </div>
      <div className="form__field">
        <label htmlFor="first-name">Country</label>
        <input type="text" name="first-name" placeholder="Country" />
      </div>
    </div>
  );
};

export default ContactInfo;
