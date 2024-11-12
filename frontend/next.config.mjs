/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/api/auth/login',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
