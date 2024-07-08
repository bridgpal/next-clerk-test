import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="p-10">
      <SignUp
        routing="path"
        path="/sign-up"
        afterSignUpUrl="/additional-info"
        redirectUrl="/additional-info"
      />
    </div>
  );
}
