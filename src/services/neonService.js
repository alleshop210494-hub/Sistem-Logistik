import { neon } from '@neondatabase/serverless';

const DATABASE_URL = import.meta.env.VITE_NEON_DATABASE_URL;

/**
 * Fungsi untuk mengambil daftar pengiriman dari database Neon.
 * Jika URL belum disiapkan atau gagal terhubung, otomatis menggunakan data dummy lokal.
 */
export async function getShipments() {
  if (!DATABASE_URL || DATABASE_URL.includes('your_neon_url') || DATABASE_URL.includes('placeholder')) {
    return [
      { id: 'LOG-001', destination: 'Jakarta', status: 'Dalam Perjalanan', recipient: 'Budi Santoso', proof_url: '' },
      { id: 'LOG-002', destination: 'Bandung', status: 'Tiba di Gudang', recipient: 'Siti Rahma', proof_url: '' },
      { id: 'LOG-003', destination: 'Surabaya', status: 'Pending', recipient: 'Ahmad Dani', proof_url: '' },
    ];
  }

  try {
    const sql = neon(DATABASE_URL);
    const data = await sql`SELECT * FROM shipments ORDER BY created_at DESC`;
    return data;
  } catch (error) {
    console.warn("Neon DB belum terhubung, menggunakan data dummy lokal:", error.message);
    return [
      { id: 'LOG-001', destination: 'Jakarta', status: 'Dalam Perjalanan', recipient: 'Budi Santoso', proof_url: '' },
      { id: 'LOG-002', destination: 'Bandung', status: 'Tiba di Gudang', recipient: 'Siti Rahma', proof_url: '' },
      { id: 'LOG-003', destination: 'Surabaya', status: 'Pending', recipient: 'Ahmad Dani', proof_url: '' },
    ];
  }
}

/**
 * Fungsi untuk menambahkan pengiriman baru ke database Neon.
 */
export async function addShipment(shipmentData) {
  if (!DATABASE_URL || DATABASE_URL.includes('your_neon_url') || DATABASE_URL.includes('placeholder')) {
    console.log("Simulasi simpan data (Neon belum dikonfigurasi):", shipmentData);
    return shipmentData;
  }

  try {
    const sql = neon(DATABASE_URL);
    const { id, destination, recipient, status, proof_url } = shipmentData;
    const result = await sql`
      INSERT INTO shipments (id, destination, recipient, status, proof_url)
      VALUES (${id}, ${destination}, ${recipient}, ${status}, ${proof_url || ''})
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Gagal menyimpan data ke Neon:", error);
    throw error;
  }
}

/**
 * Fungsi untuk memperbarui status pengiriman di database Neon.
 */
export async function updateShipmentStatus(id, newStatus) {
  if (!DATABASE_URL || DATABASE_URL.includes('your_neon_url') || DATABASE_URL.includes('placeholder')) {
    console.log("Simulasi update status:", id, newStatus);
    return { id, status: newStatus };
  }

  try {
    const sql = neon(DATABASE_URL);
    const result = await sql`
      UPDATE shipments 
      SET status = ${newStatus} 
      WHERE id = ${id} 
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Gagal memperbarui status di Neon:", error);
    throw error;
  }
}