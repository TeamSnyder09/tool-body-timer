import { Request, Response } from 'express';
import { TrackerService } from '../services/trackerService';

export class MachineController {
    private trackerService: TrackerService;

    constructor() {
        this.trackerService = new TrackerService();
    }

    public addMachine = (req: Request, res: Response): void => {
        const machineData = req.body;
        this.trackerService.addMachine(machineData);
        res.status(201).json({ message: 'Machine added successfully' });
    };

    public updateMachine = (req: Request, res: Response): void => {
        const machineId = req.params.id;
        const updatedData = req.body;
        this.trackerService.updateMachine(machineId, updatedData);
        res.status(200).json({ message: 'Machine updated successfully' });
    };

    public getMachine = (req: Request, res: Response): void => {
        const machineId = req.params.id;
        const machine = this.trackerService.getMachine(machineId);
        if (machine) {
            res.status(200).json(machine);
        } else {
            res.status(404).json({ message: 'Machine not found' });
        }
    };

    public getAllMachines = (req: Request, res: Response): void => {
        const machines = this.trackerService.getAllMachines();
        res.status(200).json(machines);
    };
}