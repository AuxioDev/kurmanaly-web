/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Только WebP: исходники уже в WebP, а AVIF-кодирование некоторых листов чертежей
    // зависало на десятки секунд на холодном кэше (картинки не грузились).
    formats: ["image/webp"],
  },
};

export default nextConfig;
