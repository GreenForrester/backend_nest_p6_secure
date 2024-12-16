import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/entities/customer.entity';
import { OrderItem } from './orders/entities/orderitem.entity';
import { Product } from './products/entities/product.entity';
import { Order } from './orders/entities/order.entity';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Auth } from './auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres', //use postgres for docker compose and localhost otherwise
      port: 5432,
      username: 'testuser',
      password: 'testpassword',
      database: 'testdatabase6',
      entities: [Customer, Order, Product, OrderItem, User, Auth], //todo: provide entities here
      synchronize: true,
    }),
    ProductsModule,
    CustomersModule,
    OrdersModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
