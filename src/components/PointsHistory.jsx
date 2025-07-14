import React from "react";

function PointsHistory({pointsHistory}){
    return <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Points History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Points</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {pointsHistory.map((history) => (
                <tr key={history._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{history.user.name}</td>
                  <td className="py-3 px-4">{history.points}</td>
                  <td className="py-3 px-4">
                    {new Date(history.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
}

export default PointsHistory;