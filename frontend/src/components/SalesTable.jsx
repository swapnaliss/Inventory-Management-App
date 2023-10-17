import React, { useState } from 'react';

const SalesTable = ({ data }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filteredData, setFilteredData] = useState(null);

  const convertDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${day}-${month}-${year}`;
  };

  const handleFilter = () => {
    const filtered = data.filter(
      (sale) =>
        convertDate(sale.date) >= convertDate(startDate) &&
        convertDate(sale.date) <= convertDate(endDate)
    );
    setFilteredData(filtered);
  }

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-40 mt-1 px-3 py-2 block border rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
        />

        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-40 mt-1 px-3 py-2 block border rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
        />
      </div>

      <button
        onClick={handleFilter}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Filter
      </button>
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
          {filteredData
            ? filteredData.map((sales) => (
              <tr key={sales._id} className="border-t group hover-bg-gray-100">
                <td className="py-2 px-4 text-center">{sales.itemSold}</td>
                <td className="py-2 px-4 text-center">{sales.quantity}</td>
                <td className="py-2 px-4 text-center">{sales.price}</td>
                <td className="py-2 px-4 text-center">{sales.totalRevenue}</td>
                <td className="py-2 px-4 text-center">{convertDate(sales.date)}</td>
              </tr>
            ))
            : data.map((sales) => (
              <tr key={sales._id} className="border-t group hover-bg-gray-100">
                <td className="py-2 px-4 text-center">{sales.itemSold}</td>
                <td className="py-2 px-4 text-center">{sales.quantity}</td>
                <td className="py-2 px-4 text-center">{sales.price}</td>
                <td className="py-2 px-4 text-center">{sales.totalRevenue}</td>
                <td className="py-2 px-4 text-center">{convertDate(sales.date)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
