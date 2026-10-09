export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // 1. MASUKKAN URL WEBHOOK DISCORD LU DI SINI
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1557355730380521592/_hNjty1tZp_L_9u55cY-WPGO_MoUkl7buqs_JIsY951zJ9HCOIjpR0qLE0mWeJK5OeB_";

  // 2. MASUKKAN LINK LOGO & GIF LU DI SINI
  const LOGO_URL = "https://i.imgur.com/B32xZjh.png"; // Ganti dengan link logo lu
  const GIF_URL = "https://i.imgur.com/dUa938o.gif"; // Ganti dengan link GIF lu

  const data = req.body;
  
  // Tangkap data
  const nama = data.name || data.sender_name || data.username || data.donatur || "SESEORANG";
  const jumlahMentah = data.amount || data.total || data.nominal || 0;
  const jumlahFormat = "RP " + Number(jumlahMentah).toLocaleString('id-ID');
  const pesan = data.message || data.pesan || "TIDAK ADA PESAN";
  const trxId = data.id || data.trx_id || data.transaction_id || `TRX-${Date.now()}`;

  // Bikin format tanggal
  const dateOptions = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Jakarta' };
  const hariTanggal = new Intl.DateTimeFormat('id-ID', dateOptions).format(new Date()).toUpperCase();

  const discordPayload = {
    embeds: [
      {
        // Bagian ini bikin judul bold dan besar, sub-judul normal di bawahnya
        title: "## LOSS STUDIO ANNOUNCEMENT\nWHOP CAIR KETUA DONASI BARU",
        color: 16777215, // Warna putih
        
        // Logo di pojok kanan atas
        thumbnail: {
          url: LOGO_URL
        },

        // GIF/Gambar di bagian bawah
        image: {
          url: GIF_URL
        },

        // Susunan informasi menyamping
        fields: [
          { name: "NAMA", value: `**${nama.toUpperCase()}**`, inline: true },
          { name: "JUMLAH", value: `**${jumlahFormat}**`, inline: true },
          { name: "\u200B", value: "\u200B", inline: true }, // Spacer biar sejajar
          
          { name: "PESAN", value: `**${pesan.toUpperCase()}**`, inline: true },
          { name: "HARI", value: `**${hariTanggal}**`, inline: true },
          { name: "\u200B", value: "\u200B", inline: true }, // Spacer
          
          { name: "ID TRANSAKSI", value: `**${trxId}**`, inline: true }
        ]
      }
    ]
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    });
    return res.status(200).send('Sukses');
  } catch (error) {
    return res.status(500).send('Error');
  }
}
