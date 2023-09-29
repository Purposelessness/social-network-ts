import * as path from "path";

import express from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import morgan from 'morgan';

import frontRouter from './loaders/front-routes';

const server = express();

// view engine setup
server.set('view engine', 'pug');
server.set('views', path.join(__dirname, '../src/views'));

// compress all responses with gzip
server.use(compression());
// print request logs
server.use(morgan('dev'));
// process body parameters
server.use(express.json());
// process url encoded parameters
server.use(express.urlencoded({extended: false}));
// process cookies
server.use(cookieParser());
// process public files
server.use(express.static(path.join(__dirname, '../public')));

frontRouter(server);

// catch 404 and forward to error handler
server.use((req, res, next) => {
  next(createError(404));
});

// error handler
server.use((err: any, req: express.Request, res: express.Response, _: Function) => {
  // set locals, only providing error in development
  res.locals['message'] = err.message;
  res.locals['error'] = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});