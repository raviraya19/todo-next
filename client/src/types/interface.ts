// types.ts

export interface GetCallParams {
  URL: string;
  methodType: "GET" | "POST" | "PUT" | "DELETE"; // or any other methods you might use
}

export interface PostCallParams<T> {
  URL: string;
  methodType: "POST" | "PUT";
  params: T;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}
