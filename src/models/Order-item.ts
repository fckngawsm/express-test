// @/models.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "order-item",
})
export class OrderItem extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  readonly id!: bigint;
}
