import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProductsFacade } from '~/modules/products/products.facade';
import { ImportProductResponseDTO } from './dtos/import-product-response.dto';
import { ProductEntity } from '~/modules/products/domain/entities/product.entity';
import { GetProductsRequestDTO } from './dtos/get-products-request.dto';
import { GetProductsQuery } from '~/modules/products/application/get-products/get-products.query';
import { GetProductsResponseDTO } from './dtos/get-products-response.dto';

@ApiTags('Produtos')
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsFacade: ProductsFacade) {}

  @ApiOkResponse({ type: GetProductsResponseDTO })
  @ApiOperation({ summary: 'Listar produtos' })
  @Get('/')
  public async index(
    @Query() query: GetProductsRequestDTO,
  ): Promise<GetProductsResponseDTO> {
    return this.productsFacade.getProducts(
      new GetProductsQuery(query.page, query.limit),
    );
  }

  @ApiOperation({ summary: 'Buscar produto pelo código' })
  @Get('/:code')
  public async show(
    @Param('code') code: string,
  ): Promise<ImportProductResponseDTO> {
    return this.productsFacade.getProduct(code);
  }

  @ApiOperation({ summary: 'Atualizar produto' })
  @Put('/:code')
  public async update(
    @Param('code') code: string,
    @Body() updateData: any,
  ): Promise<ImportProductResponseDTO> {
    return this.productsFacade.update(code, updateData);
  }

  @ApiOperation({ summary: 'Remover produto' })
  @Delete('/:code')
  public async delete(@Param('code') code: string): Promise<ProductEntity> {
    return this.productsFacade.delete(code);
  }
}
