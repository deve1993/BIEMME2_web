/**
 * Upload Media Script
 * Uploads images to Payload CMS Media collection and associates them with records
 */

import { getPayload } from "payload";
import config from "../payload.config";
import path from "path";
import fs from "fs";

// Map of team member names to their photo filenames
const teamPhotos: Record<string, string> = {
  "Geom. Paolo Pini": "paolo-pini.webp",
  "Sabrina Bove": "sabrina-bove.webp",
  "Ketty Pozzoni": "ketty-pozzoni.webp",
  "Giuseppe Sonzogni": "giuseppe-sonzogni.webp",
  "Giovanni Berta": "giovanni-berta.webp",
};

async function uploadMedia() {
  console.log("📸 Starting media upload...\n");

  const payload = await getPayload({ config });

  const publicDir = path.resolve(process.cwd(), "public");
  const teamDir = path.join(publicDir, "img", "team");
  const logoPath = path.join(publicDir, "img", "logo.webp");

  // 1. Upload logo
  console.log("📷 Uploading logo...");
  if (fs.existsSync(logoPath)) {
    try {
      // Check if logo already exists
      const existingLogo = await payload.find({
        collection: "media",
        where: { filename: { equals: "logo.webp" } },
      });

      if (existingLogo.docs.length === 0) {
        const logoBuffer = fs.readFileSync(logoPath);
        const logoMedia = await payload.create({
          collection: "media",
          data: {
            alt: "BIEMME 2 Logo",
          },
          file: {
            data: logoBuffer,
            name: "logo.webp",
            mimetype: "image/webp",
            size: logoBuffer.length,
          },
        });
        console.log(`   ✅ Logo uploaded: ${logoMedia.id}`);

        // Update Header global with logo
        await payload.updateGlobal({
          slug: "header",
          data: {
            logo: {
              image: logoMedia.id,
              alt: "BIEMME 2",
            },
          },
        });
        console.log("   ✅ Header logo updated");
      } else {
        console.log("   ⏭️  Logo already exists, skipping");
      }
    } catch (error) {
      console.error("   ❌ Error uploading logo:", error);
    }
  } else {
    console.log("   ⚠️  Logo file not found");
  }

  // 2. Upload team photos and associate with team members
  console.log("\n📷 Uploading team photos...");

  // Get all team members
  const teamMembers = await payload.find({
    collection: "team-members",
    limit: 100,
  });

  for (const member of teamMembers.docs) {
    const photoFilename = teamPhotos[member.name];
    if (!photoFilename) {
      console.log(`   ⚠️  No photo mapping for: ${member.name}`);
      continue;
    }

    const photoPath = path.join(teamDir, photoFilename);
    if (!fs.existsSync(photoPath)) {
      console.log(`   ⚠️  Photo file not found: ${photoFilename}`);
      continue;
    }

    try {
      // Check if photo already exists
      const existingPhoto = await payload.find({
        collection: "media",
        where: { filename: { equals: photoFilename } },
      });

      let mediaId: string;

      if (existingPhoto.docs.length === 0) {
        // Upload new photo
        const photoBuffer = fs.readFileSync(photoPath);
        const photoMedia = await payload.create({
          collection: "media",
          data: {
            alt: member.name,
          },
          file: {
            data: photoBuffer,
            name: photoFilename,
            mimetype: "image/webp",
            size: photoBuffer.length,
          },
        });
        mediaId = String(photoMedia.id);
        console.log(`   ✅ Uploaded: ${photoFilename}`);
      } else {
        mediaId = String(existingPhoto.docs[0].id);
        console.log(`   ⏭️  Already exists: ${photoFilename}`);
      }

      // Associate photo with team member
      await payload.update({
        collection: "team-members",
        id: member.id,
        data: {
          photo: mediaId,
        },
      });
      console.log(`   🔗 Associated with: ${member.name}`);
    } catch (error) {
      console.error(`   ❌ Error processing ${photoFilename}:`, error);
    }
  }

  console.log("\n🎉 Media upload complete!");
  process.exit(0);
}

uploadMedia().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
