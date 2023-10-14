// DataTable.js

import React from 'react';

const DataTable = ({ data, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-300">
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Quantity</th>
          <th className="py-2 px-4">Price</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-t group hover:bg-gray-100">
            <td className="py-2 px-4 text-center">{item.name}</td>
            <td className="py-2 px-4 text-center">{item.quantity}</td>
            <td className="py-2 px-4 text-center">{item.price}</td>
            <td className="py-2 px-4" style={{ position: 'relative' }}>
              <div className="opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full bg-gray-100 flex justify-center items-center">
                <button onClick={() => onEdit(item)} className="mx-2 text-blue-600 hover:underline">
                  Edit
                </button>
                <button onClick={() => onDelete(item.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
