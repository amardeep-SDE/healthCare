// src/components/common/Badge.jsx
import React, { memo } from "react";
import { getStatusBadge } from "../../utils/formatters";

export const Badge = memo(({ status, children, variant, className = "" }) => {
  const badgeClasses = variant || getStatusBadge(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClasses} ${className}`}
    >
      {children || status}
    </span>
  );
});

Badge.displayName = "Badge";

