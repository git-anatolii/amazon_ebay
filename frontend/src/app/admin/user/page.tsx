import { Metadata } from 'next';

import User from "@/components/User";

export const metadata: Metadata = {
  title: "Users"
}

export default function UserPage() {
  return (
    <div className="w-full">
      <User />
    </div>
  );
}
