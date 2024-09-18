import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
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
import { BaseHeaders } from '~/shared/headers/base.headers';

@ApiTags(PRODUCTS_DOC_TITLE)
@Controller(PRODUCTS_ROUTE)
export class ProductsController {
  constructor(private readonly productsFacade: ProductsFacade) {}

  @ApiOkResponse({ type: GetProductsResponseDTO })
  @ApiOperation({ summary: 'Listar produtos' })
  @Get('/')
  public async index(
    @Headers() _: BaseHeaders,
    @Query() query: GetProductsRequestDTO,
  ): Promise<GetProductsResponseDTO> {
    return this.productsFacade.getProducts(
      new GetProductsQuery(query.page, query.limit),
    );
  }

  @ApiOkResponse({ type: ProductResponseDTO })
  @ApiOperation({ summary: 'Buscar produto pelo código' })
  @Get('/:code')
  public async show(
    @Headers() _: BaseHeaders,
    @Param('code') code: string,
  ): Promise<ProductResponseDTO> {
    return this.productsFacade.getProduct(Number(code));
  }

  @ApiOkResponse({ type: ProductResponseDTO })
  @ApiOperation({ summary: 'Atualizar produto' })
  @Put('/:code')
  public async update(
    @Headers() _: BaseHeaders,
    @Param('code') code: string,
    @Body() body: any,
  ): Promise<ProductResponseDTO> {
    return this.productsFacade.updateProduct(Number(code), body);
  }

  @ApiOkResponse({ type: ProductResponseDTO })
  @ApiOperation({ summary: 'Remover produto' })
  @Delete('/:code')
  public async delete(
    @Headers() _: BaseHeaders,
    @Param('code') code: string,
  ): Promise<ProductResponseDTO> {
    return this.productsFacade.deleteProduct(Number(code));
  }
}
