import { Hono } from 'hono';

const fib = new Hono();

fib.get('/', (c) => {
	const n = c.req.query('n');
	if (!n) {
		return c.json(
			{
				status: '400',
				message: 'n is required',
			},
			400
		);
	}
	const num = parseInt(n);
	if (isNaN(num)) {
		return c.json(
			{
				status: '400',
				message: 'n should be a number',
			},
			400
		);
	}
	if (num <= 0) {
		return c.json(
			{
				status: '400',
				message: 'n should be a positive number',
			},
			400
		);
	}
	const fibs = [0, 1];
	for (let i = 2; i <= num; i++) {
		fibs.push(fibs[i - 1] + fibs[i - 2]);
	}
	return c.json({ result: fibs[num] }, 200);
});

export default fib;
