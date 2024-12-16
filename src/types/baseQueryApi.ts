export type CustomError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: {
      path: string;
      message: string;
    }[];
    stack?: any;
  };
}

// export type TResponse = {

// }