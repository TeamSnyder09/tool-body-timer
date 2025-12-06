import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust the base URL as needed

export const getTools = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tools`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tools:', error);
        throw error;
    }
};

export const getMachines = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/machines`);
        return response.data;
    } catch (error) {
        console.error('Error fetching machines:', error);
        throw error;
    }
};

export const addTool = async (toolData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tools`, toolData);
        return response.data;
    } catch (error) {
        console.error('Error adding tool:', error);
        throw error;
    }
};

export const updateTool = async (toolId, toolData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/tools/${toolId}`, toolData);
        return response.data;
    } catch (error) {
        console.error('Error updating tool:', error);
        throw error;
    }
};

export const deleteTool = async (toolId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/tools/${toolId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting tool:', error);
        throw error;
    }
};