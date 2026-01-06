export const logger = (req: Request, res: Response, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
    next();
};