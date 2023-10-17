import React from 'react'

const AddItemForm = ({ isModalOpen, handleAddItem, editingItem, newItem, setNewItem, closeModal }) => {
    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white w-1/2 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">{editingItem ? "Edit item" : "Add item"}</h2>
                        <form onSubmit={handleAddItem}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter the name"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
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
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                    className="w-full p-2 rounded border border-gray-300"
                                    required
                                />
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
                                    value={newItem.quantity}
                                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                    className="w-full p-2 rounded border border-gray-300"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">
                                    {editingItem ? "Edit" : "Add"}
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

export default AddItemForm