// Calculate fibonacci number
const fibCal = (n: number): string => {

    if (n < 0) {
        return 'Error - n should be a positive number';
    }
    if (n > 1400) {
        return 'Error - n should be less than 1400';
    }
    if (n % 1 !== 0) {
        return 'Error - n should be an integer';
    }

    if (n === 0) {
        return '0';
    }
    if (n === 1) {
        return '1';
    }
    
	let a = 0n, b = 1n;
    for (let i = 2 ; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    const result = b.toString();

    return result;
};

export default fibCal;