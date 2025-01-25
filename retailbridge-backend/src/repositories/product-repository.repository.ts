import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ProductdbDataSource} from '../datasources';
import {Product, ProductRelations} from '../models';

export class ProductRepositoryRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  constructor(
    @inject('datasources.productdb') dataSource: ProductdbDataSource,
  ) {
    super(Product, dataSource);
  }
}
