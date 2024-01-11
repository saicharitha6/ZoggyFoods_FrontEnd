import React from "react";
import AddEditAddress from "./AddEditAddress";

const EditAddress = ({ address }) => {
  return (
    <AddEditAddress
      isEdit={true}
      address={address} // Pass the addressId prop to the Address component
    />
  );
};

export default EditAddress;
