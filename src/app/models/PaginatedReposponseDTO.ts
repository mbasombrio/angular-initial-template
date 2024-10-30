import { SupportDTO } from './supportDTO';

export interface PaginatedResponseDTO<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
  support: SupportDTO;
}
