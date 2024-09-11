'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import { HomeIcon, PencilIcon, UserIcon } from "lucide-react"; 
import { cn } from "@/lib/utils";
import Link from "next/link"; 

const SidebarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, href: "/dashboard" },
    { name: "Explore", icon: HomeIcon, href: "/explore" },
    { name: "Write", icon: PencilIcon, href: "/page/new" },
    { name: "Profile", icon: UserIcon, href: "/profile" },
  ];

  return (
    <motion.div
      animate={{ width: isOpen ? 240 : 60 }}
      className=" bg-gray-800 p-4 text-white shadow-lg"
      onHoverStart={toggleSidebar}
      onHoverEnd={toggleSidebar}
    >
      <ul className="flex flex-col space-y-6">
        {menuItems.map(({ name, icon: Icon, href }) => (
          <li key={name} className="flex">
            <Link href={href}  className={cn(
                  "flex items-center gap-4 p-2 hover:bg-gray-700 rounded-lg cursor-pointer transition-all w-full",
                  isOpen ? "justify-start" : "justify-center"
                )}
              >
             
                <Icon className="w-6 h-6" />
                {isOpen && <span className="text-lg">{name}</span>}
    
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>




  );
};

export default SidebarComponent;
