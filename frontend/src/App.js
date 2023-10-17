import './App.css';
import { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory, addItem, deleteItem, editItem } from './store/actions/inventoryActions';
import { fetchSales, addSale } from './store/actions/salesActions';
import LoadingSpinner from './components/LoadingSpinner';
import AddItemForm from './components/AddItemForm';
import SalesTable from './components/SalesTable';
import RecordSalesForm from './components/RecordSalesForm';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Inventory');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSalesFormOpen, setIsSalesFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
  });

  const [newSale, setNewSale] = useState({
    itemSold: '',
    quantity: 0,
    price: 0,
  });

  // inventory data
  const inventoryData = useSelector((state) => state.inventory.items);
  const loading = useSelector((state) => state.inventory.loading);
  const error = useSelector((state) => state.inventory.error);

  // sales data
  const salesData = useSelector((state) => state.sales.sales);
  const salesLoading = useSelector((state) => state.sales.loading);
  const salesError = useSelector((state) => state.sales.error);

  const dispatch = useDispatch();

  console.log(salesData)
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
      setIsModalOpen(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
    setNewItem({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    });
  }

  const handleDelete = (itemId) => {
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

  const handleAddSale = (event) => {
    event.preventDefault();
    dispatch(addSale(newSale));
    setNewSale({
      itemSold: '',
      quantity: 0,
      price: 0,
    });
    setIsSalesFormOpen(false);
  }

  const openSalesForm = () => {
    setIsSalesFormOpen(true);
  };

  const closeSalesForm = () => {
    setIsSalesFormOpen(false);
  }

  useEffect(() => {
    dispatch(fetchInventory());
    dispatch(fetchSales());
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
            <div className="flex justify-center">
              <h1 className="text-2xl font-semibold mb-4">Inventory</h1>
            </div>
            <button onClick={openModal} className="bg-green-500 text-white py-2 px-4 rounded-md mb-4">
              Add Item
            </button>
            <DataTable data={inventoryData} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}
        {selectedMenuItem === 'Sales' && (
          <>
            <LoadingSpinner isLoading={salesLoading} />
            <div className="flex justify-center">
              <h1 className="text-2xl font-semibold mb-4">Sales</h1>
            </div>
            <button onClick={openSalesForm} className="bg-green-500 text-white py-2 px-4 rounded-md mb-4">
              Record sales
            </button>
            <SalesTable data={salesData} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}
        {selectedMenuItem === 'Reports' && (
          <>
            Render reports
          </>
        )}

        <AddItemForm
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
          editingItem={editingItem}
        />

        <RecordSalesForm
          isModalOpen={isSalesFormOpen}
          closeModal={closeSalesForm}
          newSale={newSale}
          setNewSale={setNewSale}
          handleAddSale={handleAddSale}
          itemsFromDb={inventoryData.map((item) => ({ name: item.name, _id: item._id }))}
        />
      </div>
    </div>
  );
};

export default App;
