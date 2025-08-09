import { app } from './app';
import { ENV } from './config/env';
import { connectDB } from './config/database';
import { Movie } from './models/Movie';
import { seedIfEmpty } from './config/seed';

// Arranca el servidor inmediatamente
app.listen(ENV.PORT, () => {
  console.log(`✅ MIMO Movies API escuchando en http://localhost:${ENV.PORT}`);
});

// Inicializa la DB en segundo plano (no bloquea el listen)
(async () => {
  try {
    await connectDB();
    await Movie.sync(); 
    await seedIfEmpty();
    console.log('✅ DB lista');
  } catch (e) {
    console.error('❌ Error inicializando DB', e);
  }
})();