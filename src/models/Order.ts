// @/models.ts
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  AutoIncrement,
  DataType,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "order",
})
export class Order extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  readonly id!: bigint;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;
}
