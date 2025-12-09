import { Sidebar} from "./components/SideBar";
import { motion } from "framer-motion";
type LayoutProps = {
  children?: React.ReactNode;
};
export const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <>
    <div className="flex flex-row h-screen bg-gray-100 w-full">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-y-auto p-6"
      >
        {children}
      </motion.main>
      </div>
    </>
  );
};
