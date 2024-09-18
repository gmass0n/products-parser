export class ProductImportHistoryEntity {
  constructor(
    public readonly file_name: string,
    public readonly imported_at: Date,
    public readonly products_count: number,
  ) {}
}
