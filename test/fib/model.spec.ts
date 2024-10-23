import { describe, it, expect } from 'vitest';
import fibCal from '../../src/fib/model';

describe('Fibonacci model', () => {
    it ('fibCal(0) should return 0', () => {
        expect(fibCal(0)).toBe('0');
    });

    it ('fibCal(1) should return 1', () => {
        expect(fibCal(1)).toBe('1');
    });

    it ('fibCal(2) should return 1', () => {
        expect(fibCal(2)).toBe('1');
    });

    it ('fibCal(3) should return 2', () => {
        expect(fibCal(3)).toBe('2');
    });

    it ('fibCal(4) should return 3', () => {
        expect(fibCal(4)).toBe('3');
    });

    it ('fibCal(5) should return 5', () => {
        expect(fibCal(5)).toBe('5');
    });

    it ('fibCal(6) should return 8', () => {
        expect(fibCal(6)).toBe('8');
    });

    it ('fibCal(7) should return 13', () => {
        expect(fibCal(7)).toBe('13');
    });

    it ('fibCal(8) should return 21', () => {
        expect(fibCal(8)).toBe('21');
    });

    it ('fibCal(9) should return 34', () => {
        expect(fibCal(9)).toBe('34');
    });

    it ('fibCal(10) should return 55', () => {
        expect(fibCal(10)).toBe('55');
    }); 

    it ('fibCal(1400) should return 17108476902340227241249719513231821477382749898026920041550883749834348017250935801359315038923367841494936038231522506358371361016671790887791259870264957823133253627917432203111969704623229384763490617075388642696139893354058660570399927047816296952516330636633851111646387885472698683607925', () => {
        expect(fibCal(1400)).toBe('17108476902340227241249719513231821477382749898026920041550883749834348017250935801359315038923367841494936038231522506358371361016671790887791259870264957823133253627917432203111969704623229384763490617075388642696139893354058660570399927047816296952516330636633851111646387885472698683607925');
    }); 

    it ('fibCal(-1) should return Error - n should be a positive number', () => {
        expect(fibCal(-1)).toBe('Error - n should be a positive number');
    });

    it ('fibCal(1.5) should return Error - n should be an integer', () => {
        expect(fibCal(1.5)).toBe('Error - n should be an integer');
    });

    it ('fibCal(1401) should return Error - n should be less than 1400', () => {
        expect(fibCal(1401)).toBe('Error - n should be less than 1400');
    });
});