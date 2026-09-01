import { createFileRoute, redirect } from "@tanstack/react-router";

// The deliverable is a set of self-contained static HTML screens in
// /public/screens. The app root simply opens the screen index.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lighthouse Lekki Estate — Community Portal Screens" },
      {
        name: "description",
        content:
          "Static screen reference for the Lighthouse Lekki Estate resident community portal: passes, dues, facilities, Madrasa and analytics.",
      },
      { property: "og:title", content: "Lighthouse Lekki Estate — Community Portal Screens" },
      {
        property: "og:description",
        content:
          "Public and resident-facing screens for the Lighthouse Lekki Estate community portal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ href: "/screens/index.html" });
  },
  component: () => null,
});
