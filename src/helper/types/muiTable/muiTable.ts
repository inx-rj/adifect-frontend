export interface TableColumnsType {
  id?: number | string;
  label: any;
  field: string;
  sort?: string;
  width?: number | string;
}

export interface TableRowsType {
  [key: string]: any;
}

export interface TableRowColType {
  columns: TableColumnsType[];
  rows: TableRowsType[];
}

export interface TableDataResponseType {
  count: number;
  next: string | null;
  prev: string | null;
  results: TableRowsType[];
}

export interface TablePaginationType {
  page: number;
  rowsPerPage: number;
}
