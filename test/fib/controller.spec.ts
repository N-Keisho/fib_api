import { describe, it, expect } from 'vitest';
import app from '../../src/index';

describe('GET /fib', () => {

	it('GET /fib', async () => {
		const res = await app.request('/fib');
		const text = await res.text();
		expect(res.status).toBe(400);
		expect(JSON.parse(text)).toEqual({ status: '400', message: 'n is required' });
	});

	it('GET /fib?n=', async () => {
		const res = await app.request('/fib?n=');
		const text = await res.text();
		expect(res.status).toBe(400);
		expect(JSON.parse(text)).toEqual({ status: '400', message: 'n is required' });
	});

	it('GET /fib?n=abc', async () => {
		const res = await app.request('/fib?n=abc');
		const text = await res.text();
		expect(res.status).toBe(400);
		expect(JSON.parse(text)).toEqual({ status: '400', message: 'n should be a number' });
	});

	it('GET /fib?n=10abc', async () => {
		const res = await app.request('/fib?n=10abc');
		const text = await res.text();
		expect(res.status).toBe(400);
		expect(JSON.parse(text)).toEqual({ status: '400', message: 'n should be a number' });
	});

	it('GET /fib?n=abc10', async () => {
		const res = await app.request('/fib?n=abc10');
		const text = await res.text();
		expect(res.status).toBe(400);
		expect(JSON.parse(text)).toEqual({ status: '400', message: 'n should be a number' });
	});

	it('GET /fib?n=1.5', async () => {
		const res = await app.request('/fib?n=1.5');
		const text = await res.text();
		expect(res.status).toBe(400);
		expect(JSON.parse(text)).toEqual({ status: '400', message: 'n should be an integer' });
	});

	it('GET /fib?n=-1', async () => {
		const res = await app.request('/fib?n=-1');
		const text = await res.text();
		expect(res.status).toBe(400);
		expect(JSON.parse(text)).toEqual({ status: '400', message: 'n should be a positive number' });
	});

	it('GET /fib?n=0', async () => {
		const res = await app.request('/fib?n=0');
		const text = await res.text();
		expect(res.status).toBe(400);
		expect(JSON.parse(text)).toEqual({ status: '400', message: 'n should be a positive number' });
	});

	it('GET /fib?n=10', async () => {
		const res = await app.request('/fib?n=10');
		const text = await res.text();
		expect(res.status).toBe(200);
		expect(JSON.parse(text)).toEqual({ result: '55' });
	});

	it('GET /fib?n=99', async () => {
		const res = await app.request('/fib?n=99');
		const text = await res.text();
		expect(res.status).toBe(200);
		expect(JSON.parse(text)).toEqual({ result: '218922995834555169026' });
	});

	it('GET /fib?n=1401', async () => {
		const res = await app.request('/fib?n=1401');
		const text = await res.text();
		expect(res.status).toBe(400);
		expect(JSON.parse(text)).toEqual({ status: '400', message: 'n should be less than 1400' });
	});
});