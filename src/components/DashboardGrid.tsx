
import '../stylesheet/DashboardGrid.css'; 

const DashboardGrid = ({ children }) => {
    return (
        <div className="dashboard-grid">
            {children}
        </div>
    );
};

export default DashboardGrid;