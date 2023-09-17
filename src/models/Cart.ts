// @/models.ts
import {
  Table,
  Model,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "cart",
})
export class Cart extends Model {}
