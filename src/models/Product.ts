// @/models.ts
import { Table, Model, Column, DataType } from "sequelize-typescript";

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
