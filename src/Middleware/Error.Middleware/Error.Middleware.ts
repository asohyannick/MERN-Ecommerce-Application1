/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import HttpStatus from 'http-status-codes';
import Logger from '../../Config/Loggger/Logger';
import { Request, Response, NextFunction } from 'express';

const logger = Logger.logger;

/**
 * Error response middleware for 404 not found.
 *
 * @param {Object} req
 * @param {Object} res
 */
const notFound = (req:Request, res:Response) => {
  res.status(HttpStatus.NOT_FOUND).json({
    code: HttpStatus.NOT_FOUND,
    message: 'Ooops, route not found'
  });
};

/**
 * Error response middleware for handling
 * all app errors except generic errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
const appErrorHandler = (err: any, req:Request, res:Response, next: NextFunction) => {
  if (err.code && typeof err.code === 'number') {
    logger.error(`
      status - ${err.code}
      message - ${err.message} 
      url - ${req.originalUrl} 
      method - ${req.method} 
      IP - ${req.ip}
    `);
    res.status(err.code).json({
      code: err.code,
      message: err.message
    });
  } else {
    next(err);
  }
};

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
const genericErrorHandler = (err: any, req:Request, res: Response, next: NextFunction) => {
  logger.error(`
    status - ${HttpStatus.INTERNAL_SERVER_ERROR} 
    message - ${err.stack} 
    url - ${req.originalUrl} 
    method - ${req.method} 
    IP - ${req.ip}
  `);

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    data: '',
    message: err.message
  });
};

export { notFound, appErrorHandler, genericErrorHandler };