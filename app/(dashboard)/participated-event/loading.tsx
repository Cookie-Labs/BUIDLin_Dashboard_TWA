import LoadingSpinner from '@/components/loading-spinner';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoadingSpinner color="white" />
    </div>
  );
}
