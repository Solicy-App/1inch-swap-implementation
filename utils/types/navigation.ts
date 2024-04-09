export interface INavigationLinks {
  links: string[];
}

export interface INavigationItem {
  href: string;
  text: string;
}

export interface ISearchQuery {
  from?: string;
  to?: string;
}

export interface ISearchParams {
  searchParams?: ISearchQuery;
}
