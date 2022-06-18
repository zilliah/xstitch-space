const { application } = require("express");
const express = require("express");
const app = express();
const PORT = 3000;








app.listen(PORT, _ => {
    console.log(`Server running on port ${PORT}`);
});