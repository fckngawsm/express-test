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
  tableName: "cart",
})
export class Cart extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  readonly id!: bigint;
}
