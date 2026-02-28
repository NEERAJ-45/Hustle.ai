import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn("credentials")}>Sign in</button>
    </div>
  );
}
