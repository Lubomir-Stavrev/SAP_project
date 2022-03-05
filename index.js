const express = require('express');
const config = require('./config/configIndex');
const expressConfig = require('./config/express');
const mongooseConfig = require('./config/mongoose');

const routes = require('./routes.js');
const app = express();

expressConfig(app);
mongooseConfig(app);
app.use(routes)

app.listen(config.PORT, () => console.log(`Server is running on port: ${config.PORT}...`));