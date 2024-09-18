export class PaginatedResultQuery<T> {
  constructor(
    public data: T[],
    public page: number,
    public limit: number,
    public pagesCount: number,
  ) {}
}
