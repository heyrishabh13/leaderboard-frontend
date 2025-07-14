import React from "react";

function Leaderboard({ users }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.points - a.points)
              .map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.points}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
