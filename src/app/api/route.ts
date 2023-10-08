import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware({
    target: 'http://localhost:8000', // replace with your target server
    changeOrigin: true,
    pathRewrite: { '^/api/route': '' }, // replace '/api/proxy' with your desired path
    secure: false,
});

export default function handler(req: any, res: any) {
    (apiProxy as any)(req, res, (result: any) => {
        if (result instanceof Error) {
            throw result;
        }
        throw new Error(`Request '${req.url}' is not proxied!`);
    });
}
