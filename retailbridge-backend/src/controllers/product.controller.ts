import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Product} from '../models';
import {ProductRepository} from '../repositories';

export class ProductController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) {}

  @post('/products')
  @response(200, {
    description: 'Product model instance',
    content: {'application/json': {schema: getModelSchemaRef(Product)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProduct',
            exclude: ['id'],
          }),
        },
      },
    })
    product: Omit<Product, 'id'>,
  ): Promise<Product> {
    try {
      return await this.productRepository.create(product);
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }

  @get('/products/count')
  @response(200, {
    description: 'Product model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Product) where?: Where<Product>,
  ): Promise<Count> {
    return this.productRepository.count(where);
  }

   // Fetch all products
  @get('/products')
  @response(200, {
    description: 'Array of Product model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {type: 'number'},
              name: {type: 'string'},
              price: {type: 'number'},
            },
        },
      },
    },
  },
  })
  async find(
    @param.filter(Product) filter?: Filter<Product>,
  ): Promise<Product[]> {
    try {
      return await this.productRepository.find(filter);
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  @patch('/products')
  @response(200, {
    description: 'Product PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Product,
    @param.where(Product) where?: Where<Product>,
  ): Promise<Count> {
    return this.productRepository.updateAll(product, where);
  }

  // Fetch product by ID
  @get('/products/{id}')
  @response(200, {
    description: 'Product model instance',
    content: {
      'application/json': {
        schema: {
        type: 'object',
        properties: {
          id: {type: 'number'},
          name: {type: 'string'},
          description: {type: 'string'},
          price: {type: 'number'},
          category: {type: 'string'}
        },
      },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Product, {exclude: 'where'}) filter?: FilterExcludingWhere<Product>
  ): Promise<Product> {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found.`);
      }
      return product;
    } catch (error) {
      console.error('Error fetching product by ID:', error.message);
      throw new HttpErrors.InternalServerError(
      'An unexpected error occurred. Please try again later.'
      //throw new Error(`Error fetching product by ID: ${error.message}`
      );
    }
  }

  @patch('/products/{id}')
  @response(204, {
    description: 'Product PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Product,
  ): Promise<void> {
    await this.productRepository.updateById(id, product);
  }

  @put('/products/{id}')
  @response(204, {
    description: 'Product PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() product: Product,
  ): Promise<void> {
    await this.productRepository.replaceById(id, product);
  }

  @del('/products/{id}')
  @response(204, {
    description: 'Product DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productRepository.deleteById(id);
  }
}
