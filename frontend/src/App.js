import './App.css';
import { useState, useEffect } from 'react';
import DataTable from './components/DataTable';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Inventory');
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
  });

  const handleAddItem = (newItem) => {
  };

  const handleEdit = (item) => {

  }

  const handleDelete = (item) => {

  }

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // write a sample data to test the table
  useEffect(() => {
    setItems([
      {
        name: 'Item 1',
        price: 100,
        quantity: 10,
        description: 'This is item 1',
      },
      {
        name: 'Item 2',
        price: 200,
        quantity: 20,
        description: 'This is item 2',
      },
      {
        name: 'Item 3',
        price: 300,
        quantity: 30,
        description: 'This is item 3',
      },
    ]);
  }, []);



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
            <button onClick={openModal} className="bg-green-500 text-white py-2 px-4 rounded-md mb-4">
              Add Item
            </button>
            <DataTable data={items} onEdit={handleEdit} onDelete={handleDelete} />
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
              <h2 className="text-2xl font-semibold mb-4">Add New Item</h2>
              <form>
                <input
                  type="text"
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full mb-4 p-2 rounded"
                />
                {/* Add other form fields here as needed */}
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">
                  Add
                </button>
                <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded-md ml-4">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
