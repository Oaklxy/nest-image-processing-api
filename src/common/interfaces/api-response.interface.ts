export interface IApiResponse<T = any> {
  ok: boolean;
  message: string;
  data?: T;
};
