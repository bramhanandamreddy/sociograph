
import React from 'react';
import './index.css'; 

const SupplierCard = ({ supplier }) => {
  return (
    <div className="supplier-card"> 
      <h2>{supplier.category}</h2>
      <p>Channel: {supplier.channel}</p>
      <p>Description: {supplier.request_description}</p>
      <p>Contact: {supplier.contact_numbers}</p>
      <p>State: {supplier.state}</p>
      <p>District: {supplier.district}</p>
      <p>Source Time: {supplier.source_time}</p>
    </div>
  );
}

export default SupplierCard;
