import { useState, useEffect } from "react";
import Leaderboard from "./components/Leaderboard";
import PointsHistory from "./components/PointsHistory";

// Main App Component
const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [pointsHistory, setPointsHistory] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [message, setMessage] = useState("");

  // Fetch users and points history on mount
  useEffect(() => {
    fetchUsers();
    fetchPointsHistory();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch points history
  const fetchPointsHistory = async () => {
    try {
      const response = await fetch("http://localhost:3000/points-history");
      const data = await response.json();
      setPointsHistory(data);
    } catch (error) {
      console.error("Error fetching points history:", error);
    }
  };

  // Handle claiming points
  const handleClaimPoints = async () => {
    if (!selectedUser) {
      setMessage("Please select a user!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/claim-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser }),
      });
      const data = await response.json();
      setMessage(`Claimed ${data.points} points for ${data.user.name}!`);
      fetchUsers(); // Update leaderboard
      fetchPointsHistory(); // Update history
    } catch (error) {
      console.error("Error claiming points:", error);
      setMessage("Error claiming points!");
    }
  };

  // Handle adding new user
  const handleAddUser = async () => {
    if (!newUserName.trim()) {
      setMessage("Please enter a valid user name!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newUserName }),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setNewUserName("");
      setMessage("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("Error adding user!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Leaderboard App
      </h1>

      {/* User Selection and Claim Points */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="p-2 border rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleClaimPoints}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
          >
            Claim Points
          </button>
        </div>

        {/* Add New User */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter new user name"
            className="p-2 border rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
          >
            Add User
          </button>
        </div>
        {message && (
          <p className="mt-2 text-sm text-center text-gray-600">{message}</p>
        )}
      </div>

      {/* Leaderboard */}
      <Leaderboard users={users} />

      {/* Points History */}
      <PointsHistory pointsHistory={pointsHistory} />
    </div>
  );
};

export default App;
