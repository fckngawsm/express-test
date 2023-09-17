// @/models.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "cart-item",
})
export class CartItem extends Model {
  @PrimaryKey
  @Column
  readonly id!: bigint;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;
}
