import { Request, Response, NextFunction } from 'express';
import { DecodedExpressRequest } from '../../../../modules/users/infra/http/models/decodedRequest';

export class RequestMiddleware {
  private updateBody(req: DecodedExpressRequest, paramName: string): void {
    const sources = [req.body, req.decoded, req.params].filter(Boolean);

    for (const source of sources) {
      if (source[paramName] !== undefined && !req.updatedBody[paramName]) {
        req.updatedBody[paramName] = source[paramName];
        return;
      }
    }

    req.body[paramName] = null;
  }

  public updateRequestParams(...params: string[]) {
    return (req: DecodedExpressRequest, res: Response, next: NextFunction): void => {
      req.updatedBody = { ...req.body };
      params.forEach((param) => {
        this.updateBody(req, param);
      });

      next();
    };
  }

  public updateSiteRequestParams() {
    return this.updateRequestParams('siteId', 'tenantId');
  }


  public updateUserRequestParams() {
    return this.updateRequestParams('tenantId', 'userId');
  }

  public updateTenantRequestParams() {
    return this.updateRequestParams('tenantId');
  }

 
}
