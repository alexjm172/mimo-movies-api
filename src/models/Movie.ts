import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/database';

export class Movie extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare genre: string;
  declare duration: number;
  declare rating: number | null;
}

Movie.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.FLOAT, allowNull: true }
  },
  {
    sequelize,
    tableName: 'movies',
    timestamps: false
  }
);