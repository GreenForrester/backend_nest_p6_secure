import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  orderItemId: string;

  @Index()
  @Column('uuid')
  productId: string;

  @Column()
  productName: string;

  @Column('int')
  quantity: number;

  //reverse relation with Order entity
  @ManyToOne(() => Order, (order) => order.orderItems, {
    cascade: true,
  })
  order: Order;
}
