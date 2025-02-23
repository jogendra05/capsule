// pages/CapsuleDetail.tsx
import { useLocation } from 'wouter';
import { useCapsules } from '../context/CapsuleContext';
import MediaGallery from './MediaGallery';

const CapsuleDetail = () => {
  const [params] = useLocation();
  const { capsules } = useCapsules();
  const capsuleId = params.split('/')[2];
  const capsule = capsules.find(c => c.id === capsuleId);

  if (!capsule) {
    return (
      <div className="text-center py-20 text-gray-600">
        Capsule not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{capsule.title}</h1>
        <p className="text-gray-600 text-lg">{capsule.description}</p>
        <div className="mt-4 text-sm text-gray-500">
          Unlock Date: {new Date(capsule.unlockDate).toLocaleDateString()}
        </div>
      </div>
      
      <MediaGallery mediaItems={capsule.mediaItems} />
    </div>
  );
};

export default CapsuleDetail;