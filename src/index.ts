import {Hono} from 'hono';
import fib from './fib/app';
const app = new Hono();

app.route("/fib", fib);

export default app;
