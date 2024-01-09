import React from 'react';
import Addr from './Addr';

const EditAddress = ({ addressId }) => {
  return (
    <Addr
      isEdit={true}
      addressId={addressId} // Pass the addressId prop to the Address component
    />
  );
};

export default EditAddress;
