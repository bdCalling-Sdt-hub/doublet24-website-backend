export type IGenericResponse<T> = {
  meta: {
    total: number;
    limit: number;
    page: number;
    totalPage: number;
  };
  data: T | null;
};
