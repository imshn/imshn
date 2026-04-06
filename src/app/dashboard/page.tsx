import type { Metadata } from 'next';
import DashboardPage from '@/views/Dashboard';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default function DashboardRoutePage() {
  return <DashboardPage />;
}
