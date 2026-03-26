import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import LaunchList from '../components/launches/LaunchList';
import LaunchDetail from '../components/launches/LaunchDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorFallback from '../components/common/ErrorFallback';
import { useUpcomingLaunches } from '../hooks/useUpcomingLaunches';
import type { Launch } from '../types/launch';

export default function LaunchesPage() {
  const { launches, isLoading, error, refetch } = useUpcomingLaunches(15);
  const [selected, setSelected] = useState<Launch | null>(null);

  return (
    <PageLayout
      title="Launch Schedule"
      subtitle="Upcoming rocket launches worldwide"
      missionLabel="Mission: Launch Schedule"
    >
      {isLoading && <LoadingSpinner message="Fetching launch data..." />}
      {error && <ErrorFallback message={error} onRetry={refetch} />}
      {!isLoading && !error && (
        <LaunchList launches={launches} onSelect={setSelected} />
      )}
      {selected && (
        <LaunchDetail launch={selected} onClose={() => setSelected(null)} />
      )}
    </PageLayout>
  );
}
