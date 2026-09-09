import cors from 'cors';
import express from 'express';
import authRoutes from '../routes/AuthRoutes.js';
import materialRoutes from '../routes/MaterialRoutes.js';
import medalRoutes from '../routes/MedalRoutes.js';
import recyclingPointRoutes from '../routes/RecyclingPointRoutes.js';
import recyclingRecordRoutes from '../routes/RecyclingRecordRoutes.js';
import roleRoutes from '../routes/RoleRoutes.js';
import userRoutes from '../routes/UserRoutes.js';

class App{
    private app: express.Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares():void{
        this.app.use(cors());
        this.app.use(express.json());
    }

    private routes():void{
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api", userRoutes);
        this.app.use("/api", recyclingPointRoutes);
        this.app.use("/api", materialRoutes);
        this.app.use("/api", medalRoutes);
        this.app.use("/api", recyclingRecordRoutes);
        this.app.use("/api", roleRoutes);
    }

    getApp(){
        return this.app;
    }
}

export default new App().getApp();
