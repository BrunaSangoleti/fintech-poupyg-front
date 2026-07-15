import React from 'react'; 
import '../stylesheet/DashboardGrid.css';


const DashboardGrid = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="dashboard-grid">
            {children}
        </div>
    );
};

export default DashboardGrid;