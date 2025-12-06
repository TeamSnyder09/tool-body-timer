import { Router } from 'express';
import ToolController from '../controllers/toolController';

const router = Router();
const toolController = new ToolController();

// Route to get all tools
router.get('/', toolController.getAllTools.bind(toolController));

// Route to get a tool by ID
router.get('/:id', toolController.getToolById.bind(toolController));

// Route to create a new tool
router.post('/', toolController.createTool.bind(toolController));

// Route to update a tool by ID
router.put('/:id', toolController.updateTool.bind(toolController));

// Route to delete a tool by ID
router.delete('/:id', toolController.deleteTool.bind(toolController));

export default router;