import { motion } from "framer-motion";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  Icon?: React.ReactNode;
};


export function StatCard(props:StatCardProps) {
    const {change,title,value,Icon}=props;
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full -mr-16 -mt-16 opacity-50" />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
          </div>

          <div className={`w-12 h-12 rounded-xl flex items-center justify-center`}>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg bg-green-100 text-green-600">
            {change}
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      </div>
    </motion.div>
  );
}
