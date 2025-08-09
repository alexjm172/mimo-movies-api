import { User } from '../models/User';
export async function findByUsername(username: string) {
  return User.findOne({ where: { username } });
}
