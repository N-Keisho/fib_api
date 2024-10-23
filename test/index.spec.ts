import { describe, it, expect } from 'vitest';
import app from '../src/index';

describe('GET /', () => {
	it ('GET /', async () => {
		const res = await app.request('/');
		const text = await res.text();
		expect(res.status).toBe(404);
	});	
});