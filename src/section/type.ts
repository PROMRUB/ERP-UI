export type DataTableProps = {
  hasNext?: boolean;
  hasPrevious?: boolean;
  pageSize?: number;
  items?: object[];
  totalCount?: number;
  totalPages?: number;
  currentPage?: number;
}
  