import { Tool } from '../../types';
import { fetchTools } from './api';
import ToolList from '../components/ToolList';

class App {
    private tools: Tool[] = [];

    constructor() {
        this.initialize();
    }

    private async initialize() {
        this.tools = await fetchTools();
        this.render();
    }

    private render() {
        const toolListComponent = new ToolList(this.tools);
        document.getElementById('app')?.appendChild(toolListComponent.render());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});