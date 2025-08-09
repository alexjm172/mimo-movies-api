import { app } from './app';
import { ENV } from './config/env';
import { connectDB, sequelize } from './config/database';
import { seedIfEmpty } from './config/seed';

// registra modelos
import './models/Movie';
import './models/User';
import './models/Rating';
import './models/WatchlistItem';

app.listen(ENV.PORT, () => {
  console.log(`✅ MIMO Movies API escuchando en http://localhost:${ENV.PORT}`);
});

(async () => {
  try {
    await connectDB();
    await sequelize.sync();
    await seedIfEmpty();
    console.log('✅ DB lista');
  } catch (e) {
    console.error('❌ Error inicializando DB', e);
  }
})();