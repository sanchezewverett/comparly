import { handler } from './handler';

handler()
    .then(() => {
        console.log('Handler finished!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Handler error:', err);
        process.exit(1);
    });