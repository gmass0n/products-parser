import { registerAs } from '@nestjs/config';
import { CronExpression, CronOptions } from '@nestjs/schedule';

type CronItem = CronOptions & {
  time: string;
};

export type CronConfig = {
  productsImport: CronItem;
};

export const parseCronConfig = registerAs('cron', (): CronConfig => {
  const { PRODUCTS_IMPORT_CRON_TIME } = process.env;

  return {
    productsImport: {
      time: PRODUCTS_IMPORT_CRON_TIME || CronExpression.EVERY_DAY_AT_6AM,
      disabled: !PRODUCTS_IMPORT_CRON_TIME,
      name: 'productsImport',
    },
  };
});

export const cronConfig = parseCronConfig();
