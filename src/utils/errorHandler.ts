export default function errorHandler(status: Response["status"]) {
  switch (status) {
    case 401:
      throw new Error("Unauthorized");
    case 404:
      throw new Error("Not Found");
    case 500:
      throw new Error("Internal Server Error");
    default:
      throw new Error("Something went wrong");
  }
}
