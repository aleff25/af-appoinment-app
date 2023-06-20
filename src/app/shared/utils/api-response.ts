export interface ApiResponse<T> {
  hasNext: boolean;
  items: Array<T>
}
