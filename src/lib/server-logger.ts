export const serverLogger = {
    error: (message: unknown, ...args: unknown[]) => {
        console.error(message, ...args);
    },
    info: (message: unknown, ...args: unknown[]) => {
        console.info(message, ...args);
    },
    warn: (message: unknown, ...args: unknown[]) => {
        console.warn(message, ...args);
    },
};