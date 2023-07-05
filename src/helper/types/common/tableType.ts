export interface initialTableConfigInterface {
  rowsPerPage: number; // page_size
  page: number; // page no.
  search?: string;
  from_date?: string;
  to_date?: string;
  ordering?: string;
  community?: string;
  status?: string;
  tag?: string;
  company?: string | number;
}
