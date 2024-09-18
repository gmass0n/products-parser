import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { GetSystemStatusUseCase } from './get-system-status/get-system-status.use-case';

@Module({
  providers: [GetSystemStatusUseCase],
  exports: [GetSystemStatusUseCase],
})
export class SystemApplicationModule {
  static withInfrastructure(
    infrastructure: ModuleMetadata['imports'],
  ): DynamicModule {
    return {
      module: SystemApplicationModule,
      imports: [...infrastructure],
      providers: [],
    };
  }
}
