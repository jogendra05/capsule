// import React, { useState, useCallback, FormEvent } from 'react';
// import { useLocation } from 'wouter';
// import { motion, AnimatePresence } from 'framer-motion';
// import DatePicker from 'react-datepicker';
// import { useDropzone } from 'react-dropzone';
// import { Lock, Calendar, Upload, Globe, X } from 'lucide-react';
// import "react-datepicker/dist/react-datepicker.css";
// import axios from 'axios';

// // Cloudinary configuration is REMOVED
// // const CLOUDINARY_CLOUD_NAME = import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your_cloudinary_cloud_name';
// // const CLOUDINARY_UPLOAD_PRESET = import.meta.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset';

// interface MediaFile {
//     file: File;
//     preview: string;
//     type: 'image' | 'video' | 'audio';
// }

// const CreateCapsule = () => {
//     const [, setLocation] = useLocation();
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [unlockDate, setUnlockDate] = useState<Date | null>(null);
//     const [isPublic, setIsPublic] = useState(false);
//     const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [apiError, setApiError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     const onDrop = useCallback((acceptedFiles: File[]) => {
//         const newFiles = acceptedFiles.map(file => ({
//             file,
//             preview: URL.createObjectURL(file),
//             type: file.type.split('/')[0] as 'image' | 'video' | 'audio',
//         }));

//         setMediaFiles(prev => [...prev, ...newFiles]);

//         // Simulate upload progress (remove if not needed)
//         let progress = 0;
//         const interval = setInterval(() => {
//             progress += 10;
//             setUploadProgress(progress);
//             if (progress >= 100) {
//                 clearInterval(interval);
//                 setTimeout(() => setUploadProgress(0), 1000);
//             }
//         }, 200);
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         accept: {
//             'image/*': [],
//             'video/*': [],
//             'audio/*': [],
//         }
//     });

//     const removeFile = (index: number) => {
//         setMediaFiles(prev => {
//             const newFiles = [...prev];
//             URL.revokeObjectURL(newFiles[index].preview);
//             newFiles.splice(index, 1);
//             return newFiles;
//         });
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         setApiError(null);  // Clear previous errors
//         setSuccessMessage(null);

//         try {
//             // Create a FormData object to send the files to the backend
//             const formData = new FormData();
//             formData.append('title', title);
//             formData.append('description', description);

//             if (unlockDate) {
//                 formData.append('unlock_date', unlockDate.toISOString()); // Send as ISO string
//             }
//             formData.append('is_public', String(isPublic)); // Send as string

//             mediaFiles.forEach((mediaFile, index) => {
//                 formData.append(`media_file_${index}`, mediaFile.file); // Append each file
//             });

//             const apiUrl = 'http://127.0.0.1:8000/api/timecapsule/create/'; // Your Django API endpoint
//             const token = localStorage.getItem('accessToken');

//             const response = await axios.post(
//                 apiUrl,
//                 formData,  // Send the FormData object
//                 {
//                     headers: {
//                         // Authorization: `Bearer ${token}`, // Include JWT token
//                         'Content-Type': 'multipart/form-data', // Important!
//                     },
//                 }
//             );

//             console.log('API Response:', response.data);
//             setSuccessMessage('Time Capsule created successfully!');

//             // Reset form fields
//             setTitle('');
//             setDescription('');
//             setUnlockDate(null);
//             setIsPublic(false);
//             setMediaFiles([]);
//             setLocation('/');

//         } catch (error: any) {
//             console.error('API Error:', error);
//             if (error.response && error.response.data) {
//                 setApiError(JSON.stringify(error.response.data)); // Display backend validation errors
//             } else {
//                 setApiError('An error occurred while creating the time capsule.');
//             }
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="max-w-4xl mx-auto py-8 px-4"
//         >
//             <div className="bg-white rounded-xl shadow-sm p-8">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Time Capsule</h1>
//                 <p className="text-gray-600 mb-8">Preserve your memories and unlock them in the future.</p>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     {/* Title Input */}
//                     <div>
//                         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                             Title
//                         </label>
//                         <input
//                             type="text"
//                             id="title"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="Name your time capsule"
//                             required
//                         />
//                     </div>

//                     {/* Description Input */}
//                     <div>
//                         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                             Description
//                         </label>
//                         <textarea
//                             id="description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             rows={4}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                             placeholder="What's inside this capsule?"
//                             required
//                         />
//                     </div>

//                     {/* Unlock Date Picker */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Unlock Date
//                         </label>
//                         <div className="relative">
//                             <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//                             <DatePicker
//                                 selected={unlockDate}
//                                 onChange={setUnlockDate}
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                                 placeholderText="When should this capsule unlock?"
//                                 minDate={new Date()}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     {/* Media Upload */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Add Media
//                         </label>
//                         <div
//                             {...getRootProps()}
//                             className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'
//                                 }`}
//                         >
//                             <input {...getInputProps()} />
//                             <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                             <p className="mt-2 text-sm text-gray-600">
//                                 Drag & drop images, videos, or audio files here, or click to select files
//                             </p>
//                         </div>

//                         {/* Upload Progress */}
//                         {uploadProgress > 0 && (
//                             <div className="mt-4">
//                                 <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                                     <motion.div
//                                         className="h-full bg-indigo-600"
//                                         initial={{ width: 0 }}
//                                         animate={{ width: `${uploadProgress}%` }}
//                                     />
//                                 </div>
//                             </div>
//                         )}

//                         {/* Media Preview */}
//                         <AnimatePresence>
//                             <motion.div
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 exit={{ opacity: 0 }}
//                                 className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4"
//                             >
//                                 {mediaFiles.map((file, index) => (
//                                     <motion.div
//                                         key={file.preview}
//                                         initial={{ opacity: 0, scale: 0.8 }}
//                                         animate={{ opacity: 1, scale: 1 }}
//                                         exit={{ opacity: 0, scale: 0.8 }}
//                                         className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
//                                     >
//                                         {file.type === 'image' && (
//                                             <img
//                                                 src={file.preview}
//                                                 alt="Preview"
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         )}
//                                         {file.type === 'video' && (
//                                             <video
//                                                 src={file.preview}
//                                                 alt="Preview"
//                                                 className="w-full h-full object-cover"
//                                                 controls
//                                             />
//                                         )}
//                                         {file.type === 'audio' && (
//                                             <div className="w-full h-full flex items-center justify-center bg-gray-100">
//                                                 <audio src={file.preview} controls />
//                                             </div>
//                                         )}
//                                         <button
//                                             onClick={() => removeFile(index)}
//                                             className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
//                                         >
//                                             <X className="w-4 h-4 text-gray-600" />
//                                         </button>
//                                     </motion.div>
//                                 ))}
//                             </motion.div>
//                         </AnimatePresence>
//                     </div>

//                     {/* Privacy Settings */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-3">
//                             Privacy Settings
//                         </label>
//                         <div className="space-y-3">
//                             <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                                 <input
//                                     type="radio"
//                                     name="privacy"
//                                     checked={!isPublic}
//                                     onChange={() => setIsPublic(false)}
//                                     className="h-4 w-4 text-indigo-600"
//                                 />
//                                 <Lock className="w-5 h-5 text-gray-400" />
//                                 <div>
//                                     <p className="font-medium text-gray-900">Private</p>
//                                     <p className="text-sm text-gray-500">Only you can access this capsule</p>
//                                 </div>
//                             </label>
//                             <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
//                                 <input
//                                     type="radio"
//                                     name="privacy"
//                                     checked={isPublic}
//                                     onChange={() => setIsPublic(true)}
//                                     className="h-4 w-4 text-indigo-600"
//                                 />
//                                 <Globe className="w-5 h-5 text-gray-400" />
//                                 <div>
//                                     <p className="font-medium text-gray-900">Shareable</p>
//                                     <p className="text-sm text-gray-500">Share via link or invite specific people</p>
//                                 </div>
//                             </label>
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="flex justify-end space-x-4">
//                         <button
//                             type="button"
//                             onClick={() => setLocation('/')}
//                             className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//                         >
//                             Create Capsule
//                         </button>
//                     </div>
//                         {apiError && <div className="error">{apiError}</div>}
//                         {successMessage && <div className="success">{successMessage}</div>}
//                 </form>
//             </div >
//         </motion.div >
//     );
// };

// export default CreateCapsule;














import React, { useState, useCallback, FormEvent } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { useDropzone } from 'react-dropzone';
import { Lock, Calendar, Upload, Globe, X } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

// Cloudinary configuration is REMOVED
// const CLOUDINARY_CLOUD_NAME = import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'your_cloudinary_cloud_name';
// const CLOUDINARY_UPLOAD_PRESET = import.meta.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'your_upload_preset';

interface MediaFile {
    file: File;
    preview: string;
    type: 'image' | 'video' | 'audio';
}

const CreateCapsule = () => {
    const [, setLocation] = useLocation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [unlockDate, setUnlockDate] = useState<Date | null>(null);
    const [isPublic, setIsPublic] = useState(false);
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [apiError, setApiError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            type: file.type.split('/')[0] as 'image' | 'video' | 'audio',
        }));

        setMediaFiles(prev => [...prev, ...newFiles]);

        // Simulate upload progress (remove if not needed)
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => setUploadProgress(0), 1000);
            }
        }, 200);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'video/*': [],
            'audio/*': [],
        }
    });

    const removeFile = (index: number) => {
        setMediaFiles(prev => {
            const newFiles = [...prev];
            URL.revokeObjectURL(newFiles[index].preview);
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setApiError(null);  // Clear previous errors
      setSuccessMessage(null);
  
      try {
          // Create a FormData object to send the files to the backend
          const formData = new FormData();
  
          // Add content_type based on whether media files are present
          const content_type = mediaFiles.length > 0 ? 'file' : 'text';
          formData.append('content_type', content_type);
  
          // Add text_content if no media files are present
          if (content_type === 'text') {
              formData.append('text_content', description);
          }
  
          // Add media files if present
          if (content_type === 'file' && mediaFiles.length > 0) {
              mediaFiles.forEach((mediaFile) => {
                  formData.append('file', mediaFile.file); // Append each file
              });
          }
  
          // Add scheduled_date (unlockDate) in ISO 8601 format
          if (unlockDate) {
              const isoDate = unlockDate.toISOString(); // Convert to ISO 8601 format
              formData.append('scheduled_date', isoDate);
          }
  
          const apiUrl = 'http://127.0.0.1:8000/api/timecapsule/create/'; // Your Django API endpoint
          const token = localStorage.getItem('authToken');

          
          console.log("Token:", token);
          if (!token) {
              console.error("No token found in local storage!");
              setApiError("Authentication required. Please log in.");
              return; // Stop the form submission
          }


          const response = await axios.post(
              apiUrl,
              formData,  // Send the FormData object
              {
                  headers: {
                      Authorization: `Bearer ${token}`, // Include JWT token if required
                      'Content-Type': 'multipart/form-data', // Important for file uploads
                  },
              }
          );
  
          console.log('API Response:', response.data);
          setSuccessMessage('Time Capsule created successfully!');
  
          // Reset form fields
          setTitle('');
          setDescription('');
          setUnlockDate(null);
          setIsPublic(false);
          setMediaFiles([]);
          setLocation('/');
  
      } catch (error: any) {
          console.error('API Error:', error);
          if (error.response && error.response.data) {
              setApiError(JSON.stringify(error.response.data)); // Display backend validation errors
          } else {
              setApiError('An error occurred while creating the time capsule.');
          }
      }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto py-8 px-4"
        >
            <div className="bg-white rounded-xl shadow-sm p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Time Capsule</h1>
                <p className="text-gray-600 mb-8">Preserve your memories and unlock them in the future.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Description Input */}
                  <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                      </label>
                      <textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="What's inside this capsule?"
                          required
                      />
                  </div>

                  {/* Unlock Date Picker */}
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                          Unlock Date
                      </label>
                      <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <DatePicker
                              selected={unlockDate}
                              onChange={setUnlockDate}
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholderText="When should this capsule unlock?"
                              minDate={new Date()}
                              required
                          />
                      </div>
                  </div>

                  {/* Media Upload */}
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                          Add Media
                      </label>
                      <div
                          {...getRootProps()}
                          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500'
                              }`}
                      >
                          <input {...getInputProps()} />
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">
                              Drag & drop images, videos, or audio files here, or click to select files
                          </p>
                      </div>

                      {/* Upload Progress */}
                      {uploadProgress > 0 && (
                          <div className="mt-4">
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div
                                      className="h-full bg-indigo-600"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${uploadProgress}%` }}
                                  />
                              </div>
                          </div>
                      )}

                      {/* Media Preview */}
                      <AnimatePresence>
                          <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4"
                          >
                              {mediaFiles.map((file, index) => (
                                  <motion.div
                                      key={file.preview}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                                  >
                                      {file.type === 'image' && (
                                          <img
                                              src={file.preview}
                                              alt="Preview"
                                              className="w-full h-full object-cover"
                                          />
                                      )}
                                      {file.type === 'video' && (
                                          <video
                                              src={file.preview}
                                              alt="Preview"
                                              className="w-full h-full object-cover"
                                              controls
                                          />
                                      )}
                                      {file.type === 'audio' && (
                                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                              <audio src={file.preview} controls />
                                          </div>
                                      )}
                                      <button
                                          onClick={() => removeFile(index)}
                                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                                      >
                                          <X className="w-4 h-4 text-gray-600" />
                                      </button>
                                  </motion.div>
                              ))}
                          </motion.div>
                      </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                      <button
                          type="button"
                          onClick={() => setLocation('/')}
                          className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                          Cancel
                      </button>
                      <button
                          type="submit"
                          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                          Create Capsule
                      </button>
                  </div>
                  {apiError && <div className="error">{apiError}</div>}
                  {successMessage && <div className="success">{successMessage}</div>}
                </form>
            </div >
        </motion.div >
    );
};

export default CreateCapsule;