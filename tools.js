const { LihatJawa } = require('./lib/banner');
const TampilMenuGengsi = require('./modules/menu');
const openBo = require('./lib/openChannel');

// meluncurkan muwani
console.clear();
LihatJawa();
TampilMenuGengsi().catch(console.error);