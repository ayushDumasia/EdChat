import { app, appConfig } from './config.js';
import authRoutes from './src/routes/auth.routes.js';
import collegeInfoRoutes from './src/routes/collegeInfo.routes.js';
import collegeRoutes from './src/routes/data.routes.js';
import messageRoutes from './src/routes/message.routes.js';

appConfig();
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/college', collegeRoutes);
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/collegeInfo', collegeInfoRoutes);
