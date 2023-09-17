// @/models.ts
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "cartItem",
})
export class CartItem extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;
}
