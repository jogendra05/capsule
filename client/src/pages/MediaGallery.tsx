// components/MediaGallery.tsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Media } from '../context/CapsuleContext';

interface MediaGalleryProps {
  mediaItems: Media[];
}

const MediaGallery = ({ mediaItems }: MediaGalleryProps) => {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMediaClick = (media: Media, index: number) => {
    setSelectedMedia(media);
    setCurrentIndex(index);
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % mediaItems.length
      : (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    
    setSelectedMedia(mediaItems[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((media, index) => (
          <motion.div
            key={media.id}
            className="relative group aspect-square cursor-pointer"
            onClick={() => handleMediaClick(media, index)}
            layout
          >
            {media.type === 'image' && (
              <img
                src={media.url}
                alt={media.description || ''}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            )}
            {media.type === 'video' && (
              <video
                className="w-full h-full object-cover rounded-lg shadow-md"
                controls
              >
                <source src={media.url} />
              </video>
            )}
            {media.type === 'audio' && (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
                <audio controls className="w-full">
                  <source src={media.url} />
                </audio>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelectedMedia(null)}
          >
            <div className="max-w-4xl w-full mx-4 relative">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="relative bg-gray-800 rounded-xl overflow-hidden"
              >
                {selectedMedia.type === 'image' && (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.description || ''}
                    className="w-full h-full object-contain max-h-[80vh]"
                  />
                )}
                {selectedMedia.type === 'video' && (
                  <video
                    className="w-full h-full object-contain max-h-[80vh]"
                    controls
                    autoPlay
                  >
                    <source src={selectedMedia.url} />
                  </video>
                )}
                {selectedMedia.type === 'audio' && (
                  <div className="p-8">
                    <audio controls className="w-full" autoPlay>
                      <source src={selectedMedia.url} />
                    </audio>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaGallery;