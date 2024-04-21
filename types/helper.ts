export type ReadOnlyProps<T> = {
  readonly [K in keyof T]: T[K];
};

export interface IPageQueryParams<T> {
  params: { slug: string };
  searchParams: T;
}
