// @/models.ts
import { Table, Model, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";

const Categories = [
  "книги",
  "товары для дома",
  "запчасти для машины",
  "другое",
];

@Table({
  timestamps: true,
  tableName: "product",
})
export class Product extends Model {
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
  imageUrl!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.ENUM({ values: Categories }),
    allowNull: false,
  })
  categories!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price!: number;
}
