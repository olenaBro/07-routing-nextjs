import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '../../../../../lib/api';
import FilteredNotesClient from './FilteredNotes.client';

interface FilteredNotesPageProps {
  params: Promise<{ tag: string[] }>;
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { tag } = await params;
  const currentTag = tag?.[0] ?? 'all';
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', currentTag],
    queryFn: () => fetchNotes({ page: 1, tag: currentTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilteredNotesClient tag={currentTag} />
    </HydrationBoundary>
  );
}
