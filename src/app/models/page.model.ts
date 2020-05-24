interface Sort {
  'sorted': boolean;
  'unsorted': boolean;
  'empty': boolean;
}

interface Pageable {
  'sort': Sort;
  'offset': number;
  'pageSize': number;
  'pageNumber': number;
  'unpaged': boolean;
  'paged': boolean;
}

interface Page<T> {
  'content': Array<T>;
  'pageable': Pageable;
  'totalElements': number;
  'totalPages': number;
  'last': boolean;
  'size': boolean;
  'number': number;
  'sort': Sort;
  'numberOfElements': number;
  'first': boolean;
  'empty': boolean;
}

interface PageRequest {
  page: number;
  size: number;
  sortBy: string;
  sortStrategy: string;
}
