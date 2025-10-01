const { openBo } = require('./lib/openChannel');
const { LihatJawa } = require('./lib/banner');
const TampilMenuGengsi = require('./modules/menu');

// meluncurkan muwani
console.clear();
openBo();
LihatJawa();
TampilMenuGengsi().catch(console.error);
