const PLACEHOLDER_IMAGE = "https://via.placeholder.com/600x400?text=Image+not+available";

export const normalizeImageUrl = (image) => {
  if (!image || typeof image !== "string") {
    return PLACEHOLDER_IMAGE;
  }

  const trimmed = image.trim();
  if (!trimmed) {
    return PLACEHOLDER_IMAGE;
  }

  if (trimmed.startsWith("data:")) {
    return trimmed;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("base64,")) {
    return `data:image/jpeg;base64,${trimmed.slice(7)}`;
  }

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }

  if (trimmed.startsWith("/")) {
    const backend = process.env.REACT_APP_BACKEND_URL || "https://ecommerce-backend-a1yo.onrender.com";
    return `${backend}${trimmed}`;
  }

  return trimmed;
};

export const imageErrorFallback = (event) => {
  if (event?.target) {
    event.target.src = PLACEHOLDER_IMAGE;
  }
};
