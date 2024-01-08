import React from 'react';
import Address from './Address';

const EditAddress = ({ addressId }) => {
  return (
    <Address
      isEdit={true}
      addressId={addressId} // Pass the addressId prop to the Address component
    />
  );
};

export default EditAddress;
