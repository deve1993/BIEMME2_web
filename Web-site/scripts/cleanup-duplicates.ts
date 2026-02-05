/**
 * Cleanup Duplicates Script
 * Removes duplicate records created by multiple seed runs
 */

import { getPayload } from "payload";
import config from "../payload.config";

const collectionsToClean = [
  "features",
  "stats",
  "highlights",
  "projects",
  "timeline",
  "values",
  "team-members",
  "certifications",
  "services",
  "pillars",
  "benefits",
  "machinery",
] as const;

async function cleanupDuplicates() {
  console.log("🧹 Starting duplicate cleanup...\n");

  const payload = await getPayload({ config });

  for (const slug of collectionsToClean) {
    try {
      // Get all documents
      const result = await payload.find({
        collection: slug,
        limit: 1000,
        sort: "createdAt",
      });

      const docs = result.docs;
      console.log(`📁 ${slug}: Found ${docs.length} total documents`);

      if (docs.length === 0) continue;

      // Find duplicates by title (or label for stats)
      const seen = new Map<string, string>();
      const duplicateIds: string[] = [];

      for (const doc of docs) {
        // Use title, label, or name as the unique identifier
        const identifier =
          (doc as { title?: string }).title ||
          (doc as { label?: string }).label ||
          (doc as { name?: string }).name ||
          "";

        if (!identifier) continue;

        if (seen.has(identifier)) {
          // This is a duplicate - mark for deletion
          duplicateIds.push(String(doc.id));
        } else {
          // First occurrence - keep it
          seen.set(identifier, String(doc.id));
        }
      }

      if (duplicateIds.length > 0) {
        console.log(`   🗑️  Deleting ${duplicateIds.length} duplicates...`);

        for (const id of duplicateIds) {
          await payload.delete({
            collection: slug,
            id,
          });
        }

        console.log(`   ✅ Cleaned up ${duplicateIds.length} duplicates`);
      } else {
        console.log(`   ✅ No duplicates found`);
      }
    } catch (error) {
      console.error(`   ❌ Error cleaning ${slug}:`, error);
    }
  }

  console.log("\n🎉 Cleanup complete!");
  process.exit(0);
}

cleanupDuplicates().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
