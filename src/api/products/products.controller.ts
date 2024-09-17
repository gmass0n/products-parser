import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ProductsFacade } from '~/modules/products/products.facade';
import { ImportProductResponseDTO } from './dtos/import-product-response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsFacade: ProductsFacade) {}

  @ApiOperation({ summary: 'Importar produto' })
  @Post('import')
  public async import(
    @Body() productData: any,
  ): Promise<ImportProductResponseDTO> {
    return this.productsFacade.import(productData);
  }

  @ApiOperation({ summary: 'Atualizar produto' })
  @Put('update/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateData: any,
  ): Promise<ImportProductResponseDTO> {
    return this.productsFacade.update(id, updateData);
  }
}
