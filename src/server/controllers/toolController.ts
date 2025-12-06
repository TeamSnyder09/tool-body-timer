export class ToolController {
    private trackerService: any; // Replace 'any' with the actual type of your tracker service

    constructor(trackerService: any) { // Replace 'any' with the actual type of your tracker service
        this.trackerService = trackerService;
    }

    public async addTool(req: any, res: any): Promise<void> {
        try {
            const toolData = req.body;
            const newTool = await this.trackerService.addTool(toolData);
            res.status(201).json(newTool);
        } catch (error) {
            res.status(500).json({ message: 'Error adding tool', error });
        }
    }

    public async updateTool(req: any, res: any): Promise<void> {
        try {
            const toolId = req.params.id;
            const toolData = req.body;
            const updatedTool = await this.trackerService.updateTool(toolId, toolData);
            res.status(200).json(updatedTool);
        } catch (error) {
            res.status(500).json({ message: 'Error updating tool', error });
        }
    }

    public async getTool(req: any, res: any): Promise<void> {
        try {
            const toolId = req.params.id;
            const tool = await this.trackerService.getTool(toolId);
            if (tool) {
                res.status(200).json(tool);
            } else {
                res.status(404).json({ message: 'Tool not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tool', error });
        }
    }

    public async getAllTools(req: any, res: any): Promise<void> {
        try {
            const tools = await this.trackerService.getAllTools();
            res.status(200).json(tools);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tools', error });
        }
    }
}