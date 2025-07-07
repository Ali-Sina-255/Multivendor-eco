import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const data = evt.data;

      const primaryEmail = data.email_addresses?.[0]?.email_address;
      if (!primaryEmail) {
        console.warn("No email found for user:", data.id);
        return new Response("Missing email", { status: 400 });
      }

      const userData = {
        id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: primaryEmail,
        picture: data.image_url,
        role: "USER",
      };

      const dbUser = await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          name: userData.name,
          picture: userData.picture,
        },
        create: userData,
      });

      console.log(`User ${eventType}:`, dbUser);
      const client = await clerkClient();
      try {
        await client.users.updateUserMetadata(data.id, {
          privateMetadata: {
            role: dbUser.role || "USER",
          },
        });
      } catch (err) {
        console.error("Failed to update Clerk metadata:", err);
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
