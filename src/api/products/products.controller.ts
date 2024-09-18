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
import { GetProductsRequestDTO } from './dtos/get-products-request.dto';
import { GetProductsQuery } from '~/modules/products/application/get-products/get-products.query';
import { GetProductsResponseDTO } from './dtos/get-products-response.dto';
import { ProductResponseDTO } from './dtos/product-response.dto';
import { PRODUCTS_DOC_TITLE, PRODUCTS_ROUTE } from './constants';

@ApiTags(PRODUCTS_DOC_TITLE)
@Controller(PRODUCTS_ROUTE)
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

  @ApiOkResponse({ type: ProductResponseDTO })
  @ApiOperation({ summary: 'Buscar produto pelo código' })
  @Get('/:code')
  public async show(@Param('code') code: string): Promise<ProductResponseDTO> {
    return this.productsFacade.getProduct(Number(code));
  }

  @ApiOkResponse({ type: ProductResponseDTO })
  @ApiOperation({ summary: 'Atualizar produto' })
  @Put('/:code')
  public async update(
    @Param('code') code: string,
    @Body() body: any,
  ): Promise<ProductResponseDTO> {
    return this.productsFacade.updateProduct(Number(code), body);
  }

  @ApiOkResponse({ type: ProductResponseDTO })
  @ApiOperation({ summary: 'Remover produto' })
  @Delete('/:code')
  public async delete(
    @Param('code') code: string,
  ): Promise<ProductResponseDTO> {
    return this.productsFacade.deleteProduct(Number(code));
  }
}
