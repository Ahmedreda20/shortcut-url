import BaseApi from "../../utils/BaseApi";
import type { Request, Response, NextFunction, Application } from "express";
import { pick } from "lodash";
import { isUri } from "valid-url";
import ApiError from "../../utils/errors/ApiError";
import db from "../../models";
import { Model } from "sequelize";
import { generate } from "shortid";
import GenerateLocation from "../../utils/generateLocation";

export default class UrlController extends BaseApi {
  async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const { url } = pick(req.body, ["url"]);

      if (!url || !isUri(url))
        throw new ApiError("UNPROCESSABLE_ENTITY", "Invalid URL");

      const model = db.Url satisfies Model;

      const isExisted = await model.findOne({ where: { url } });
      if (isExisted)
        throw new ApiError("UNPROCESSABLE_ENTITY", "URL is already existed!!");

      const code = generate();
      const newModel = new model({ url, code });
      const location = GenerateLocation(req);

      await newModel.save();
      super.send(res, { url: location + "/" + newModel.code });
    } catch (error) {
      next(error);
    }
  }

  async Get(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = pick(req.params, ["code"]);
      console.log(code);

      const model = db.Url satisfies Model;

      const isExisted = await model.findOne({ where: { code } });
      if (!isExisted) throw new ApiError("NOT_FOUND", undefined);

      res.redirect(isExisted?.url);
    } catch (error) {
      next(error);
    }
  }
}
