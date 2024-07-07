import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST() {
  const { stripeId, userId } = await body.json();
  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      stripeId: stripeId,
    },
  });
  return NextResponse.json({ success: true });
}
