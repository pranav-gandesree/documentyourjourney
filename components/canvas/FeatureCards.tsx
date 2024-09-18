import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react"; // Import the LucideIcon type

interface FeatureCardProps {
  icon: LucideIcon; // Specific type for icon
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <motion.div
    className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="h-12 w-12 mb-4 text-purple-400" />
    <h3 className="text-lg font-bold text-purple-300">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </motion.div>
);
