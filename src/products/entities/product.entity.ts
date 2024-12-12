import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column()
  productName: string;

  @Column()
  productvendor: string;

  @Column()
  productDescription: string;

  @Column()
  quantityInStock: number;

  @Column('float')
  buyPrice: number;

  @Column('float')
  msrp: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  modificationDate: Date;
}
