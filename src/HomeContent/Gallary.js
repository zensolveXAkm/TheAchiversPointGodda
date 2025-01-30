import React, { useState } from "react";

const images = [
  "/assets/gallary/gallary (1).jpg",
  "/assets/gallary/gallary (2).jpg",
  "/assets/gallary/gallary (3).jpg",
  "/assets/gallary/gallary (4).jpg",
  "/assets/gallary/gallary (5).jpg",
  "/assets/gallary/gallary (6).jpg",
  "/assets/gallary/gallary (7).jpg",
  "/assets/gallary/gallary (8).jpg",
  "/assets/gallary/gallary (9).jpg",
  "/assets/gallary/gallary (10).jpg",
  "/assets/gallary/gallary (11).jpg",
  "/assets/gallary/gallary (12).jpg",
  "/assets/gallary/gallary (13).jpg",
  "/assets/gallary/gallary (14).jpg",
  "/assets/gallary/gallary (15).jpg",
  "/assets/gallary/gallary (16).jpg",
  "/assets/gallary/gallary (17).jpg",
  "/assets/gallary/gallary (18).jpg",
  "/assets/gallary/gallary (19).jpg",
  "/assets/gallary/gallary (20).jpg",
  "/assets/gallary/gallary (21).jpg",
  "/assets/gallary/gallary (22).jpg",
  "/assets/gallary/gallary (23).jpg",
  "/assets/gallary/gallary (24).jpg",
  "/assets/gallary/gallary (25).jpg",
  "/assets/gallary/gallary (26).jpg",
  "/assets/gallary/gallary (27).jpg",
  "/assets/gallary/gallary (28).jpg",
  "/assets/gallary/gallary (29).jpg",
  "/assets/gallary/gallary (30).jpg",
  "/assets/gallary/gallary (31).jpg",
  "/assets/gallary/gallary (32).jpg",
  "/assets/gallary/gallary (33).jpg",
  "/assets/gallary/gallary (34).jpg",
  "/assets/gallary/gallary (35).jpg",
  "/assets/gallary/gallary (36).jpg",
  "/assets/gallary/gallary (37).jpg",
  "/assets/gallary/gallary (38).jpg",
  "/assets/gallary/gallary (39).jpg",
  "/assets/gallary/gallary (40).jpg",
  "/assets/gallary/gallary (41).jpg",
  "/assets/gallary/gallary (42).jpg",
  "/assets/gallary/gallary (43).jpg",
  "/assets/gallary/gallary (44).jpg",
  "/assets/gallary/gallary (45).jpg",
  "/assets/gallary/gallary (46).jpg",
  "/assets/gallary/gallary (47).jpg",
  "/assets/gallary/gallary (48).jpg",
  "/assets/gallary/gallary (49).jpg",
  "/assets/gallary/gallary (50).jpg",
  "/assets/gallary/gallary (51).jpg",
  "/assets/gallary/gallary (52).jpg",
  "/assets/gallary/gallary (53).jpg",
  "/assets/gallary/gallary (54).jpg",
  "/assets/gallary/gallary (55).jpg",
  "/assets/gallary/gallary (56).jpg",
  "/assets/gallary/gallary (57).jpg",
  "/assets/gallary/gallary (58).jpg",
  "/assets/gallary/gallary (59).jpg",
  "/assets/gallary/gallary (60).jpg",
  "/assets/gallary/gallary (61).jpg",
  "/assets/gallary/gallary (62).jpg",
  "/assets/gallary/gallary (63).jpg",
  "/assets/gallary/gallary (64).jpg",
  "/assets/gallary/gallary (65).jpg",
  "/assets/gallary/gallary (66).jpg",
  "/assets/gallary/gallary (67).jpg",
  "/assets/gallary/gallary (68).jpg",
  "/assets/gallary/gallary (69).jpg",
  "/assets/gallary/gallary (70).jpg",
];

const ImageGrid = () => {
  const [visibleImages, setVisibleImages] = useState(10); // Initially display 10 images

  const loadMoreImages = () => {
    setVisibleImages((prev) => Math.min(prev + 10, images.length));
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.slice(0, visibleImages).map((imageSrc, index) => (
          <div key={index}>
            <img
              className="h-auto max-w-full rounded-lg"
              src={imageSrc}
              alt={`Gallery Image ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {visibleImages < images.length && (
        <button
          onClick={loadMoreImages}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View More
        </button>
      )}
    </div>
  );
};

export default ImageGrid;
