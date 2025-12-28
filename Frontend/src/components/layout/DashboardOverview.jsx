// pages/DashboardOverview.jsx
export default function DashboardOverview() {
  return (
    <div>
      <h2>Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Quizzes Taken</h4>
          <p>12</p>
        </div>

        <div className="stat-card">
          <h4>Accuracy</h4>
          <p>78%</p>
        </div>

        <div className="stat-card">
          <h4>Submitted Quizzes</h4>
          <p>10</p>
        </div>
      </div>
    </div>
  );
}
