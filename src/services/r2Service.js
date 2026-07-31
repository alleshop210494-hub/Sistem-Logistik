import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Mengambil kredensial Cloudflare R2 dari environment variable (.env)
const R2_ACCOUNT_ID = import.meta.env.VITE_R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = import.meta.env.VITE_R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = import.meta.env.VITE_R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = import.meta.env.VITE_R2_BUCKET_NAME || "logistik-cloud-bucket";
const R2_PUBLIC_DOMAIN = import.meta.env.VITE_R2_PUBLIC_DOMAIN;

// Inisialisasi S3 Client untuk Cloudflare R2 jika kredensial tersedia
let s3Client = null;
if (R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY) {
  s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

/**
 * Fungsi untuk mengunggah file (foto bukti / dokumen) ke Cloudflare R2
 * @param {File} file - Objek file dari input HTML
 * @param {string} customFileName - Nama unik untuk file di storage
 * @returns {Promise<string>} URL akses publik file
 */
export async function uploadToR2(file, customFileName) {
  if (!s3Client) {
    console.warn("Kredensial Cloudflare R2 belum lengkap. Menggunakan simulasi URL lokal.");
    // Fallback simulasi objek URL lokal jika R2 belum dikonfigurasi di .env
    return URL.createObjectURL(file);
  }

  const fileName = customFileName || `${Date.now()}-${file.name}`;

  try {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: file.type,
    });

    await s3Client.send(command);

    // Mengembalikan URL publik file dari Cloudflare R2
    if (R2_PUBLIC_DOMAIN) {
      return `${R2_PUBLIC_DOMAIN}/${fileName}`;
    }
    
    return `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${fileName}`;
  } catch (error) {
    console.error("Gagal mengunggah file ke Cloudflare R2:", error);
    throw error;
  }
}