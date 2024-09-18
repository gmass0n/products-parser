export class ProductImportHistoryEntity {
  constructor(
    public readonly files: string[],
    public readonly imported_at: Date,
    public readonly products_count: number,
  ) {}
}
