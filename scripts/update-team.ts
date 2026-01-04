/**
 * Update Team Members Script
 * Replaces team members with correct data
 */

import { getPayload } from "payload";
import config from "../payload.config";

const team = [
  {
    name: "Geom. Paolo Pini",
    role: "Geometra",
    bio: "Direzione Lavori\npini@biemme2.com\n3478881791",
    order: 1,
    active: true,
  },
  {
    name: "Sabrina Bove",
    role: "Amministrazione",
    bio: "Impiegata amministrativa\namministrazione@biemme2.com",
    order: 2,
    active: true,
  },
  {
    name: "Ketty Pozzoni",
    role: "Amministrazione",
    bio: "info@biemme2.com",
    order: 3,
    active: true,
  },
  {
    name: "Giuseppe Sonzogni",
    role: "Geometra",
    bio: "Direzione lavori\nsonzogni@biemme2.com\n3486855615",
    order: 4,
    active: true,
  },
  {
    name: "Giovanni Berta",
    role: "Commerciale",
    bio: "berta@biemme2.com\n3478881790",
    order: 5,
    active: true,
  },
];

async function updateTeam() {
  console.log("🔄 Updating team members...\n");

  const payload = await getPayload({ config });

  // 1. Delete all existing team members
  console.log("🗑️  Deleting existing team members...");
  const existingMembers = await payload.find({
    collection: "team-members",
    limit: 100,
  });

  for (const member of existingMembers.docs) {
    await payload.delete({
      collection: "team-members",
      id: member.id,
    });
  }
  console.log(`   Deleted ${existingMembers.docs.length} members`);

  // 2. Create new team members
  console.log("\n📝 Creating new team members...");
  for (const member of team) {
    const result = await payload.create({
      collection: "team-members",
      data: member,
    });
    console.log(`   ✅ Created: ${result.name}`);
  }

  console.log("\n🎉 Team update complete!");
  process.exit(0);
}

updateTeam().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
