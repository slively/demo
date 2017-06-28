export const hocLogger = process.env.NODE_ENV === 'production' ? () => null : (name, data) => console.log(`${name}: `, data); // tslint:disable-line:no-console
