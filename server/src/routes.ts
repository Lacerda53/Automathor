import express from 'express';
import { GenerateApkController } from './controllers/generateApkController';

const routes = express.Router();
const generateApkController = new GenerateApkController();

routes.post('/', generateApkController.index);

export { routes };