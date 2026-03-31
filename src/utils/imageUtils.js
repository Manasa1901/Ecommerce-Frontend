// Utility function to construct proper image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image";

  // If it's already a full URL (starts with http/https)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it starts with /, it's an absolute path on the backend
  if (imagePath.startsWith('/')) {
    return `https://ecommerce-backend-a1yo.onrender.com${imagePath}`;
  }

  // Otherwise, assume it's a relative path in uploads directory
  return `https://ecommerce-backend-a1yo.onrender.com/uploads/${imagePath}`;
};