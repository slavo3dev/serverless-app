import httpJsonBodyParser from "@middy/http-json-body-parser"
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import middy from "@middy/core";


export const handlerMiddy = (handler) => middy(handler).use([httpErrorHandler() ,httpJsonBodyParser() ,httpEventNormalizer()])

