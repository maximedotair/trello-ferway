import { ReactNode } from "react";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div className="flex min-h-screen flex-col overflow-y-auto overflow-x-clip bg-gray-300">
      <Navbar />
      <div className="w-full grow overflow-x-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;