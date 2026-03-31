// Utility function to construct proper image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image";

  // If it's already a full URL (starts with http/https)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it starts with data: (base64)
  if (imagePath.startsWith('data:')) {
    return imagePath;
  }

  // For relative paths, try the most common pattern first
  // Most backends serve static files from /uploads or /images
  return `https://ecommerce-backend-a1yo.onrender.com/uploads/${imagePath}`;
};

// Helper function to get fallback URLs for error handling
export const getFallbackUrls = (imagePath) => {
  if (!imagePath) return ["https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image"];

  // If it's already a full URL, use it as primary and add fallbacks
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // For Amazon URLs, try different formats
    if (imagePath.includes('media-amazon.com')) {
      const baseUrl = imagePath.replace('._AC_UL480_FMwebp_QL65_.jpg', '');
      return [
        imagePath, // Original WebP
        `${baseUrl}._AC_UL480_QL65_.jpg`, // Try JPG
        `${baseUrl}._AC_UL480_.jpg`, // Try JPG without QL65
        "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Load+Error"
      ];
    }
    return [
      imagePath, // Try the original URL first
      "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Load+Error"
    ];
  }

  // If it starts with data: (base64)
  if (imagePath.startsWith('data:')) {
    return [
      imagePath, // Try base64 first
      "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Base64+Error"
    ];
  }

  // For relative paths, try different backend patterns
  const possibleUrls = [
    `https://ecommerce-backend-a1yo.onrender.com/uploads/${imagePath}`,
    `https://ecommerce-backend-a1yo.onrender.com/images/${imagePath}`,
    `https://ecommerce-backend-a1yo.onrender.com/public/${imagePath}`,
    `https://ecommerce-backend-a1yo.onrender.com/${imagePath}`,
    "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image"
  ];

  return possibleUrls;
};