"use client";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PpicSkeletonPage from "@/components/skeleton/PpicSkeletonPage";

const PpicPage = () => {
  const pathname = usePathname();
  const navigate = useRouter();

  React.useEffect(() => {
    if (pathname !== "/") {
      navigate.replace("/dashboard/ppic/job-management");
    }
  }, [pathname, navigate]);

  return (
    <PpicSkeletonPage />
  );
};

export default PpicPage;
