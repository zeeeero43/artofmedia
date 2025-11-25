
import { LucideIcon } from "lucide-react";

export type ServiceCategory = 'digital' | 'physical';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: ServiceCategory;
  cols: 1 | 2;
  image: string;
  srcSet?: string;
  href?: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface MetricItem {
  label: string;
  value: string;
  suffix?: string;
}

export interface ContentData {
  services: Record<ServiceCategory, ServiceItem[]>;
  process: Record<ServiceCategory, ProcessStep[]>;
}
