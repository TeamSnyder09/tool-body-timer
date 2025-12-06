import React from 'react';

interface MachineViewProps {
    machineId: string;
    machineName: string;
    toolUsageTime: number; // in hours
}

const MachineView: React.FC<MachineViewProps> = ({ machineId, machineName, toolUsageTime }) => {
    return (
        <div className="machine-view">
            <h2>Machine Details</h2>
            <p><strong>Machine ID:</strong> {machineId}</p>
            <p><strong>Machine Name:</strong> {machineName}</p>
            <p><strong>Tool Usage Time:</strong> {toolUsageTime} hours</p>
        </div>
    );
};

export default MachineView;