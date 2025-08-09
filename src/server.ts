import { app } from './app';
import { ENV } from './config/env';

app.listen(ENV.PORT, () => {
  console.log(`✅ MIMO Movies API escuchando en http://localhost:${ENV.PORT}`);
});
