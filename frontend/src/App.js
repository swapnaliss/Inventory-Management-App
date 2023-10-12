import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <ul>
          <li className="mb-2">
            <a href="/inventory" className="text-blue-600 hover:underline">
              Inventory
            </a>
          </li>
          <li className="mb-2">
            <a href="/sales" className="text-blue-600 hover:underline">
              Sales
            </a>
          </li>
          <li className="mb-2">
            <a href="/reports" className="text-blue-600 hover:underline">
              Reports
            </a>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="w-3/4 p-4">
        {/* Content goes here */}
      </div>
    </div>
  );
}

export default App;
