import { Router } from 'express';
import MachineController from '../controllers/machineController';

const router = Router();
const machineController = new MachineController();

// Route to get all machines
router.get('/', machineController.getAllMachines.bind(machineController));

// Route to get a specific machine by ID
router.get('/:id', machineController.getMachineById.bind(machineController));

// Route to create a new machine
router.post('/', machineController.createMachine.bind(machineController));

// Route to update an existing machine by ID
router.put('/:id', machineController.updateMachine.bind(machineController));

// Route to delete a machine by ID
router.delete('/:id', machineController.deleteMachine.bind(machineController));

export default router;