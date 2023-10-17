import React from 'react';

const SalesTable = ({ data, onEdit, onDelete }) => {
  const convertDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${day}-${month}-${year}`;
  };


  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-300">
          <th className="py-2 px-4">Item</th>
          <th className="py-2 px-4">Quantity</th>
          <th className="py-2 px-4">Price</th>
          <th className="py-2 px-4">Total Revenue</th>
          <th className="py-2 px-4">Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((sales) => (
          <tr key={sales._id} className="border-t group hover:bg-gray-100">
            <td className="py-2 px-4 text-center">{sales.itemSold}</td>
            <td className="py-2 px-4 text-center">{sales.quantity}</td>
            <td className="py-2 px-4 text-center">{sales.price}</td>
            <td className="py-2 px-4 text-center">{sales.totalRevenue}</td>
            <td className="py-2 px-4 text-center">{convertDate(sales.date)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesTable;
