import { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto">
      <Suspense fallback="loading...">{children}</Suspense>
    </div>
  );
};
export default layout;
