import { Request, Response } from "express";

export default class HelperController {
    public async getModelData(req: Request, res: Response) {
        let model: any = await this.modelNamespace(req);
        let items = await this.onlyFields(req, model);
        return res.json(items);
    }

    private async modelNamespace(req: Request): Promise<any> {
        const model = req.body.model;
        const modelName = await import(`../models/${model}.model.ts`);
        return modelName.default;
    }

    private async onlyFields(req: Request, model: any) {
        let items: any;
        const { only, method } = req.body;
        if (only) {
            const arrOnly: string[] = Object.values(only);
            items = await model.findAll({ attributes: arrOnly });
        } else if (method === "get") {
            items = await model.findAll({});
        }

        return items;
    }
}
