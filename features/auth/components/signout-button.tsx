import { SignOut } from "../actions/signout";

export const SignOutButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <form
      action={async () => {
        "use server";
        SignOut();
      }}
    >
      <button type="submit">{children}</button>
    </form>
  );
};
