import React from "react";
import Addr from "./Addr";

const EditAddress = ({ address }) => {
  return (
    <Addr
      isEdit={true}
      address={address} // Pass the addressId prop to the Address component
    />
  );
};

export default EditAddress;
