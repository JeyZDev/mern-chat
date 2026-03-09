import React from "react";
import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // สร้าง array สมมติขึ้นมา 8 รายการเพื่อแสดงเป็นรายการโหลด
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-72 border-r border-slate-800 flex flex-col transition-all duration-200 bg-[#0f171e]">
      {/* Header Skeleton */}
      <div className="p-4 border-b border-slate-800/50 w-full">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-slate-600" />
          <div className="h-5 w-20 bg-slate-800 rounded animate-pulse" />
        </div>

        {/* Online Filter Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-slate-800 rounded animate-pulse" />
          <div className="h-4 w-32 bg-slate-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Contacts List Skeleton */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar Skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="size-12 bg-slate-800 rounded-full animate-pulse" />
            </div>

            {/* User Info Skeleton - แสดงเฉพาะจอใหญ่เหมือน Sidebar จริง */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="h-4 w-24 bg-slate-800 rounded mb-2 animate-pulse" />
              <div className="h-3 w-16 bg-slate-800 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
