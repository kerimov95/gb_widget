const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));

const PORT = process.env.PORT || 5000;

app.use('/', express.static(__dirname + '/public'));
require('./src/routes')(app);

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})
