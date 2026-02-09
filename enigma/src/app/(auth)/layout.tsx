import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enigma | Auth',
  description: 'Sign in or sign up to Enigma',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Nested layouts must NOT render their own <html> or <body>;
  // only the root layout (src/app/layout.tsx) should do that.
  return <>{children}</>;
}
