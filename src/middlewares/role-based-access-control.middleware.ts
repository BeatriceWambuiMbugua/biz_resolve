// // role-based.middleware.ts

// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { RolePermissions } from '../../utils';

// @Injectable()
// export class RoleBasedMiddleware implements NestMiddleware {
//   constructor(private readonly requiredRoles: string[]) {}

//   use(req: Request, res: Response, next: NextFunction) {
//     const { user } = req;
//     if (!user || !user.role || !this.checkPermissions(user.role)) {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }
//     next();
//   }

//   private checkPermissions(userRole: string): boolean {
//     return this.requiredRoles.some((role) =>
//       RolePermissions[userRole]?.includes(role),
//     );
//   }
// }
