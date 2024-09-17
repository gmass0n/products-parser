import { DynamicModule } from '@nestjs/common';
import {
  ModelDefinition,
  MongooseModule,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

export interface DatabaseModuleParams {
  type: 'mongodb';
  mongoose: {
    uri: string;
    options: MongooseModuleOptions;
  };
}

export interface DatabaseModuleFeatureParams extends ModelDefinition {}

export class DatabaseModule {
  public static forRoot(params: DatabaseModuleParams): DynamicModule {
    return MongooseModule.forRoot(params.mongoose.uri, params.mongoose.options);
  }

  public static forFeature(model: DatabaseModuleFeatureParams): DynamicModule {
    return MongooseModule.forFeature([model]);
  }
}
