import React from 'react'; 
import '../stylesheet/DashboardContainer.css';


const DashboardContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="dashboard-container">
            {children}
        </div>
    );
};

export default DashboardContainer;