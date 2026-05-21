import { ENGINES_MAP, DEFAULT_ENGINE } from '@/config/engines';
import SearchLayoutWrapper from './SearchLayoutWrapper';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [
    { engineType: 'software' },
    { engineType: 'games' }
  ];
}

interface PageProps {
  params: Promise<{ engineType: string }>;
}

export default async function EnginePage({ params }: PageProps) {
  const { engineType } = await params;
  
  const config = ENGINES_MAP[engineType.toLowerCase()];
  
  if (!config) {
    notFound();
  }

  return <SearchLayoutWrapper config={config} />;
}