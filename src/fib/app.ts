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
    if (num > 1400){
        return c.json(
            {
                status: '400',
                message: 'n should be less than 1400',
            },
            400
        );
    }
	let a = 0n, b = 1n;
    for (let i = 2 ; i <= num; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    const result = b.toString();
	return c.json({ result: result }, 200);
});

export default fib;
