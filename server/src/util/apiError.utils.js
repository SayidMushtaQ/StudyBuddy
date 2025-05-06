export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong..!!",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.sucess = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// const obj = new ApiError(
//   404,
//   "Resource not found",
//   ["The requested item does not exist"],
//   "custom stack trace here"
// );
// obj.data = { reqID: "00239203" };
