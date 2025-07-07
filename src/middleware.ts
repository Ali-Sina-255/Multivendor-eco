import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/dashboard",
  "/dashboard/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// export default clerkMiddleware((auth, req, next) => {
//   const protectRoute = createRouteMatcher(["/"]);
//   if (protectRoute(req)) auth.protect();
// });

// export const config = {
//   matcher: [
//     "/((?!.*\\..*|_next).*)", // Matches all routes except static files and _next
//     "/", // Protect root route explicitly
//     "/api/trpc(.*)", // Protect all /api/trpc routes
//   ],
// };
