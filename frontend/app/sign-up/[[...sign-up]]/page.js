import { SignUp } from "@clerk/nextjs";

export default async function SignUpPage({ searchParams }) {
  const { role } = await searchParams;

  const redirectUrl =
    role === "creator"
      ? "/dashboard/creator"
      : role === "brand"
      ? "/dashboard/brand"
      : "/";

  return (
    <main className="min-h-screen flex items-center justify-center">
      <SignUp forceRedirectUrl={redirectUrl} />
    </main>
  );
}
