import PortalShell from "@/components/portal/PortalShell";

export const metadata = {
  title: "Patient Portal | MetaOrtho",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalShell>{children}</PortalShell>;
}
