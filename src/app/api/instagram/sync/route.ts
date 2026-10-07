import { NextRequest, NextResponse } from "next/server";
import { instagramConfig } from "@/config/instagram";
import { classifyInstagramPost } from "@/lib/instagram-classifier";
import { saveInstagramMediaLocally } from "@/lib/instagram-media-manager";
import { getInstagramPosts, addInstagramPostFromApi } from "@/lib/instagram-store";

// Admin key authentication guard
function checkAdminKey(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false; // If no key set, deny all
  const provided = req.headers.get("x-admin-key");
  return provided === adminKey;
}

export async function POST(req: NextRequest) {
  if (!checkAdminKey(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { accessToken, accountId } = instagramConfig;
    let syncedCount = 0;
    let newDraftsCount = 0;
    let needsReviewCount = 0;

    // 1. Resmî Meta Graph API Anahtarları Tanımlı mı?
    if (accessToken && accountId) {
      const graphUrl = `${instagramConfig.graphBaseUrl}/${accountId}/media?fields=${instagramConfig.mediaFields}&access_token=${accessToken}`;
      
      const res = await fetch(graphUrl);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return NextResponse.json(
          {
            success: false,
            message: `Meta Graph API Hatası: ${errorData?.error?.message || res.statusText}`,
          },
          { status: 400 }
        );
      }

      const data = await res.json();
      const rawPosts = data.data || [];

      for (const item of rawPosts) {
        syncedCount++;
        const mediaType = item.media_type === "VIDEO" || item.media_type === "REELS" ? "video" : "image";
        const mediaSourceUrl = item.media_url || item.thumbnail_url || "";

        // Medyayı yetkili API'den yerel depolama alanına aktar
        const mediaResult = await saveInstagramMediaLocally(mediaSourceUrl, item.id, item.media_type);

        const added = addInstagramPostFromApi({
          id: `ig_${item.id}`,
          originalInstagramId: item.id,
          permalink: item.permalink,
          publishedAt: item.timestamp,
          rawCaption: item.caption || "",
          mediaType: mediaType,
          localMediaUrl: mediaResult.localPath,
          localThumbnailUrl: mediaResult.localPath,
        });

        if (added.status === "draft") newDraftsCount++;
        if (added.status === "needs_review") needsReviewCount++;
      }
    } else {
      // Çevre değişkeni girilmediyse mevcut havuzu tara ve durumu raporla
      const posts = getInstagramPosts();
      syncedCount = posts.length;
      newDraftsCount = posts.filter((p) => p.status === "draft").length;
      needsReviewCount = posts.filter((p) => p.status === "needs_review").length;
    }

    const allPosts = getInstagramPosts();

    return NextResponse.json({
      success: true,
      syncedCount,
      newDraftsCount,
      needsReviewCount,
      message: `${syncedCount} adet Instagram gönderisi başarıyla tarandı ve sınıflandırıldı.`,
      posts: allPosts,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Senkronizasyon hatası: ${err?.message || "Bilinmeyen hata"}`,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  if (!checkAdminKey(req)) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const posts = getInstagramPosts();
  return NextResponse.json({
    success: true,
    total: posts.length,
    posts,
  });
}
