import { Response } from "express";
import { getStatusCode, ReasonPhrases } from "http-status-codes";

export default abstract class BaseApi {
  send(
    res: Response,
    result: string | object,
    code?: keyof typeof ReasonPhrases
  ) {
    const statusCode = getStatusCode(ReasonPhrases[code || "OK"]);
    return res.status(statusCode).json({
      status: statusCode,
      message: typeof result === "string" ? result : "success",
      result: result instanceof Object ? result : null,
    });
  }
}
