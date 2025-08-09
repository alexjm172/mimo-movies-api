import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/database';

export class WatchlistItem extends Model<InferAttributes<WatchlistItem>, InferCreationAttributes<WatchlistItem>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare movieId: number;
  declare watched: boolean;
}

WatchlistItem.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    movieId: { type: DataTypes.INTEGER, allowNull: false },
    watched: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  },
  {
    sequelize,
    tableName: 'watchlist_items',
    timestamps: false,
    indexes: [{ unique: true, fields: ['userId', 'movieId'] }]
  }
);
