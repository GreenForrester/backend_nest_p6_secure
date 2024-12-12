import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderitem.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    console.log('entered create order');
    const { orderItems, ...orderData } = createOrderDto;
    const newOrder = this.orderRepository.create(orderData);
    const savedOrder = await this.orderRepository.save(newOrder);

    console.log('saved order');

    if (orderItems && orderItems.length > 0) {
      const orderItemsToInsert = orderItems.map((item) =>
        this.orderItemRepository.create({
          ...item,
          order: savedOrder, // Associate orderItems with the saved order
        }),
      );
      await this.orderItemRepository.save(orderItemsToInsert);
    }

    return savedOrder;
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne({ where: { orderId: id } });
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOne({
      where: { orderId: id },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return await this.orderRepository.delete(order.orderId);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { orderItems, ...orderData } = updateOrderDto;

    return await this.orderRepository.manager.transaction(async (manager) => {
      // Update the order
      await manager.getRepository(Order).update(id, orderData);

      // Fetch existing order items
      const existingOrder = await manager
        .getRepository(Order)
        .findOne({ where: { orderId: id }, relations: ['orderItems'] });
      const existingOrderItemIds = existingOrder.orderItems.map(
        (item) => item.orderItemId,
      );

      // Update or add order items, iterating through received data
      for (const item of orderItems) {
        if (item.orderItemId) {
          // Update existing order item, the list is not empty
          await manager.getRepository(OrderItem).update(item.orderItemId, item);
          existingOrderItemIds.splice(
            existingOrderItemIds.indexOf(item.orderItemId),
            1,
          ); // Remove updated item from the list
        } else {
          // Add new order item
          const newItem = manager
            .getRepository(OrderItem)
            .create({ ...item, order: existingOrder }); //referential integrity
          await manager.getRepository(OrderItem).save(newItem);
        }
      }

      // Delete removed order items, only unavailable are left as api user sent in updated items list
      if (existingOrderItemIds.length > 0) {
        await manager.getRepository(OrderItem).delete(existingOrderItemIds);
      }

      // Return the updated order with items
      return await manager
        .getRepository(Order)
        .findOne({ where: { orderId: id }, relations: ['orderItems'] });
    });
  }
}
