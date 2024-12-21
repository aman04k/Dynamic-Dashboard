import React from 'react';
import '../Styles/TeamTracker.css';

const TeamTracker = () => {
  const totalMembers = 120;
  const teamData = [
    { role: 'Designer', count: 48, color: '#5DB075' },
    { role: 'Developer', count: 27, color: 'rgb(61, 117, 176)' }, 
    { role: 'Project manager', count: 18, color: '#B0B0B0' },
  ];

  const totalCount = teamData.reduce((acc, data) => acc + data.count, 0);
  let currentAngle = 0;

  return (
    <div className="team-tracker-container">
      <header className="team-tracker-header">
        <span>Total employees</span>
        <button className="team-tracker-btn">➔</button>
      </header>

      <h2 className="team-tracker-title">Track your team</h2>

      <div className="team-tracker-chart">
        <div className="team-tracker-arc">
          {teamData.map((data, index) => {
            const percentage = (data.count / totalCount) * 100;
            const angle = (percentage / 100) * 360;

            const segmentStyle = {
              backgroundColor: data.color,
              transform: `rotate(${currentAngle}deg)`,
              zIndex: teamData.length - index,
              clipPath: 'polygon(50% 50%, 0 0, 100% 0)',
              transformOrigin: '100% 50%',
            };

            currentAngle += angle;

            return (
              <div
                key={index}
                className="team-tracker-arc-segment"
                style={segmentStyle}
              ></div>
            );
          })}
        </div>
        <div className="team-tracker-center">
          <p className="team-tracker-total">{totalMembers}</p>
          <span className="team-tracker-label">Total members</span>
        </div>
      </div>

      <ul className="team-tracker-legend">
        {teamData.map((data, index) => (
          <li key={index} className="team-tracker-legend-item">
            <span
              className="team-tracker-legend-color"
              style={{ backgroundColor: data.color }}
            ></span>
            {data.role} - {data.count} members
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamTracker;
