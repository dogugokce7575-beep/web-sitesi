import { NextResponse } from "next/server";
import { sendEmail } from "@/server/email";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("[TEKLIF_TALEBI_ALINDI]", new Date().toISOString(), JSON.stringify(data, null, 2));

    // Opsiyonel GoDaddy platform sendEmail() yardımcı yapısı
    const recipient = process.env.CONTACT_FORM_RECIPIENT_EMAIL || process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;
    if (recipient) {
      try {
        await sendEmail({
          to: recipient,
          subject: `Yeni Teklif Talebi: ${data.name || "İsimsiz"}`,
          text: `İsim: ${data.name || "-"}\nTelefon: ${data.phone || "-"}\nProje: ${data.projectType || "-"}\nDetay:\n${JSON.stringify(data, null, 2)}`,
        });
      } catch (emailErr) {
        console.error("[EMAIL_SEND_ERROR]", emailErr);
        // E-posta gönderilemezse sitenin tamamı çökmemeli; WhatsApp akışı ve 200 yanıtı korunur
      }
    }

    return NextResponse.json({
      success: true,
      message: "Teklif talebi başarıyla alındı ve kaydedildi.",
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[TEKLIF_TALEBI_HATA]", error);
    return NextResponse.json(
      { success: false, message: "Geçersiz istek verisi" },
      { status: 400 }
    );
  }
}
