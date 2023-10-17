import React from 'react'

const RecordSalesForm = ({ isModalOpen, handleAddSale, newSale, setNewSale, closeModal, itemsFromDb }) => {
    console.log(itemsFromDb)
    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white w-1/2 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Record Sales</h2>
                        <form onSubmit={handleAddSale}>
                            <div className="mb-4">
                                <label htmlFor="itemSold" className="block text-sm font-medium text-gray-600">
                                    Item
                                </label>
                                <select
                                    id="itemSold"
                                    name="itemSold"
                                    placeholder="Enter the itemSold"
                                    value={newSale.itemSold}
                                    onChange={(e) => setNewSale({ ...newSale, itemSold: e.target.value })}
                                    className="w-full p-2 rounded border border-gray-300"
                                    required
                                >
                                    <option value="">Select an item</option>
                                    {itemsFromDb.map((item) => (
                                        <option key={item._id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    placeholder="Enter the quantity"
                                    value={newSale.quantity}
                                    onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
                                    className="w-full p-2 rounded border border-gray-300"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="Enter the price"
                                    value={newSale.price}
                                    onChange={(e) => setNewSale({ ...newSale, price: e.target.value })}
                                    className="w-full p-2 rounded border border-gray-300"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">
                                    Save
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md ml-4"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default RecordSalesForm