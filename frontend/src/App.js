import './App.css';
import { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory, addItem, deleteItem, editItem } from './store/actions/inventoryActions';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Inventory');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
  });
  const inventoryData = useSelector((state) => state.inventory.items);
  const loading = useSelector((state) => state.inventory.loading);
  const error = useSelector((state) => state.inventory.error);
  const dispatch = useDispatch();

  console.log(inventoryData);
  console.log(error)

  const handleAddItem = (event) => {
    event.preventDefault();
    if (editingItem) {
      dispatch(editItem(editingItem._id, {
        name: newItem.name,
        price: newItem.price,
        quantity: newItem.quantity,
      }));
      dispatch(fetchInventory());
      setEditingItem(null);
      setIsModalOpen(false);
    } else {
      dispatch(addItem(newItem));
      setNewItem({
        name: '',
        price: 0,
        quantity: 0,
      });
      dispatch(fetchInventory());
      setIsModalOpen(false);
    }
  };

  const handleEdit = (item) => {
    console.log(item);
    setEditingItem(item);
    setIsModalOpen(true);
    setNewItem({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    });
  }

  const handleDelete = (itemId) => {
    console.log(itemId);
    dispatch(deleteItem(itemId));
    dispatch(fetchInventory());
  };

  const openModal = () => {
    setIsModalOpen(true);
    setNewItem({
      name: '',
      price: 0,
      quantity: 0,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-4 flex-grow-1">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setSelectedMenuItem('Inventory')}
              className={`w-full py-2 text-left ${selectedMenuItem === 'Inventory' && 'bg-blue-700'}`}
            >
              Inventory
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedMenuItem('Sales')}
              className={`w-full py-2 text-left ${selectedMenuItem === 'Sales' && 'bg-blue-700'}`}
            >
              Sales
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedMenuItem('Reports')}
              className={`w-full py-2 text-left ${selectedMenuItem === 'Reports' && 'bg-blue-700'}`}
            >
              Reports
            </button>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-4">
        {selectedMenuItem === 'Inventory' && (
          <>
            <LoadingSpinner isLoading={loading} />
            <button onClick={openModal} className="bg-green-500 text-white py-2 px-4 rounded-md mb-4">
              Add Item
            </button>
            <DataTable data={inventoryData} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}
        {selectedMenuItem === 'Sales' && (
          <>
            Render sales data
          </>
        )}
        {selectedMenuItem === 'Reports' && (
          <>
            Render reports
          </>
        )}
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
      </div>
    </div>
  );
};

export default App;
