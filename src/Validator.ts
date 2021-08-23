import {Request, Response} from "express";

export default class Validator {
    private req: Request;
    private res: Response;

    private constructor() {}

    public static with(req: Request, res: Response): Validator {
        const v = new Validator();
        v.res = res;
        v.req = req;
        return v;
    }

    public param(name: string): ValidatorInstance {
        const value = this.req.params[name];
        return new ValidatorInstance(this.res, value);
    }

    public query(name: string): ValidatorInstance {
        const value = this.req.query[name];
        return new ValidatorInstance(this.res, value);
    }

    public static check(...validators: ValidatorInstance[]): any[] | undefined {
        const results: any[] = [];
        for (const v of validators) {
            const result = v.getOrError();
            if (result !== undefined) {
                results.push(result);
            } else {
                return [false];
            }
        }
        return [true, ...results];
    }

}

export class ValidatorInstance {
    private failed = false;

    constructor(private res: Response, private raw: any) {
        this.checkFailed();
    }

    public number(): this {
        if (this.failed) return this;

        this.raw = Number(this.raw);
        if (isNaN(this.raw)) {
            this.failed = true;
        }

        return this;
    }

    public map(mapping: (value: any) => any): this {
        if (this.failed) return this;
        this.raw = mapping(this.raw);
        this.checkFailed();
        return this;
    }

    public min(min: number): this {
        if (this.failed) return this;
        if (this.raw < min) this.failed = true;
        return this;
    }

    public max(max: number): this {
        if (this.failed) return this;
        if (this.raw > max) this.failed = true;
        return this;
    }

    public orElse(optional: any): this {
        if (this.failed) {
            this.raw = optional;
            this.failed = false;
        }
        return this;
    }

    public getOrError(): any | undefined {
        if (this.failed) {
            this.fail();
            return undefined;
        }
        return this.raw;
    }

    private fail() {
        this.res.sendStatus(400);
    }

    private checkFailed() {
        if (this.raw === undefined) {
            this.failed = true;
        }
    }
}
