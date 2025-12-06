import React, { useEffect, useState } from 'react';
import { Tool } from '../../types';

const ToolList: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const response = await fetch('/api/tools');
                if (!response.ok) {
                    throw new Error('Failed to fetch tools');
                }
                const data = await response.json();
                setTools(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTools();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Tool List</h2>
            <ul>
                {tools.map(tool => (
                    <li key={tool.id}>
                        {tool.name} - Time since install: {tool.timeSinceInstall} hours
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToolList;