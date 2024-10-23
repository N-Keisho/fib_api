import { Hono } from 'hono';
import  fibCal  from './model'

const fib = new Hono();
const MAX = 1400;

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
	const num = Number(n);
    // Error handling
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
    if (num > MAX){
        return c.json(
            {
                status: '400',
                message: 'n should be less than 1400',
            },
            400
        );
    }
	const numFloat = parseFloat(n);
	if (numFloat % 1 !== 0) {
		return c.json(
			{
				status: '400',
				message: 'n should be an integer',
			},
			400
		);
	}

    const result = fibCal(num);

	return c.json({ result: result }, 200);
});



export default fib;
