const CATALOG_DATA = {
  "single-spring": {
    "title": "Single Spring Seals",
    "path": "catalog/1_Single_Spring_Seals/",
    "images": [
      "single-spring-seal-brass-carbon-face-conical-spring-006.jpg",
      "single-spring-seal-brass-carbon-face-conical-spring-012.jpg",
      "single-spring-seal-stainless-carbon-face-conical-spring-003.jpg",
      "single-spring-seal-stainless-carbon-face-conical-spring-004.jpg",
      "single-spring-seal-stainless-carbon-face-conical-spring-008.jpg",
      "single-spring-seal-stainless-carbon-face-conical-spring-009.jpg",
      "single-spring-seal-stainless-carbon-face-conical-spring-011.jpg",
      "single-spring-seal-stainless-carbon-face-conical-spring-015.jpg",
      "single-spring-seal-stainless-carbon-face-o-ring-conical-spring-014.jpg",
      "single-spring-seal-stainless-ceramic-face-conical-spring-001.jpg",
      "single-spring-seal-stainless-ceramic-face-conical-spring-002.jpg",
      "single-spring-seal-stainless-ceramic-face-conical-spring-005.jpg",
      "single-spring-seal-stainless-ceramic-face-conical-spring-007.jpg",
      "single-spring-seal-stainless-conical-spring-group-010.jpg",
      "single-spring-seal-stainless-conical-spring-group-013.jpg"
    ]
  },
  "bellows": {
    "title": "Bellows Seals",
    "path": "catalog/2_Bellows_Seals/",
    "images": [
      "bellows-seal-rubber-bellow-stainless-steel-carbon-face-001.jpg"
    ]
  },
  "multi-spring": {
    "title": "Multi Spring Seals",
    "path": "catalog/3_Multi_Spring_Seals/",
    "images": [
      "multi-spring-seal-rubber-bellow-stainless-conical-spring-013.jpg",
      "multi-spring-seal-rubber-bellow-stainless-conical-spring-014.jpg",
      "multi-spring-seal-stainless-brass-conical-spring-007.jpg",
      "multi-spring-seal-stainless-carbon-face-multi-spring-001.jpg",
      "multi-spring-seal-stainless-carbon-face-multi-spring-002.jpg",
      "multi-spring-seal-stainless-carbon-face-multi-spring-006.jpg",
      "multi-spring-seal-stainless-carbon-face-multi-spring-008.jpg",
      "multi-spring-seal-stainless-carbon-face-multi-spring-009.jpg",
      "multi-spring-seal-stainless-carbon-face-multi-spring-010.jpg",
      "multi-spring-seal-stainless-carbon-face-multi-spring-011.jpg",
      "multi-spring-seal-stainless-carbon-face-multi-spring-015.jpg",
      "multi-spring-seal-stainless-ceramic-face-multi-spring-003.jpg",
      "multi-spring-seal-stainless-ceramic-face-multi-spring-004.jpg",
      "multi-spring-seal-stainless-ceramic-face-multi-spring-005.jpg",
      "multi-spring-seal-stainless-ceramic-face-multi-spring-012.jpg"
    ]
  },
  "advanced": {
    "title": "Advanced Specialty Seals",
    "path": "catalog/4_Advanced_Specialty_Seals/",
    "images": [
      "specialty-seal-brass-carbon-face-heavy-duty-002.jpg",
      "specialty-seal-brass-carbon-face-heavy-duty-004.jpg",
      "specialty-seal-multi-type-collection-001.jpg",
      "specialty-seal-stainless-thin-design-003.jpg",
      "specialty-seal-stainless-wave-spring-005.jpg",
      "specialty-seal-stainless-wave-spring-007.jpg",
      "specialty-seal-stainless-wave-spring-008.jpg",
      "specialty-seal-varied-collection-006.jpg"
    ]
  }
};

const RECOMMENDATION_MAPPING = {
  "Oil & Gas": {
    "Centrifugal Pump": { categories: ["multi-spring", "single-spring"], keywords: ["carbon-face", "stainless"] },
    "Agitator/Mixer": { categories: ["advanced", "multi-spring"], keywords: ["heavy-duty", "multi-spring"] },
    "Compressor": { categories: ["advanced"], keywords: ["wave-spring"] },
    "Submersible Pump": { categories: ["single-spring", "bellows"], keywords: ["o-ring", "carbon"] }
  },
  "Chemical Processing": {
    "Centrifugal Pump": { categories: ["multi-spring", "single-spring"], keywords: ["ceramic-face", "stainless"] },
    "Agitator/Mixer": { categories: ["advanced"], keywords: ["heavy-duty"] },
    "Compressor": { categories: ["advanced"], keywords: ["wave-spring", "thin-design"] },
    "Submersible Pump": { categories: ["bellows"], keywords: ["rubber", "stainless"] }
  },
  "Water Treatment": {
    "Centrifugal Pump": { categories: ["single-spring"], keywords: ["brass", "carbon-face"] },
    "Agitator/Mixer": { categories: ["multi-spring"], keywords: ["brass", "stainless"] },
    "Compressor": { categories: ["advanced"], keywords: ["varied"] },
    "Submersible Pump": { categories: ["bellows", "single-spring"], keywords: ["rubber-bellow", "brass"] }
  },
  "Pharmaceutical": {
    "Centrifugal Pump": { categories: ["single-spring", "multi-spring"], keywords: ["stainless", "ceramic-face"] },
    "Agitator/Mixer": { categories: ["advanced"], keywords: ["thin-design"] },
    "Compressor": { categories: ["advanced"], keywords: ["wave-spring"] },
    "Submersible Pump": { categories: ["single-spring"], keywords: ["stainless", "o-ring"] }
  },
  "Food & Beverage": {
    "Centrifugal Pump": { categories: ["single-spring"], keywords: ["stainless", "ceramic-face"] },
    "Agitator/Mixer": { categories: ["advanced", "multi-spring"], keywords: ["stainless", "thin-design"] },
    "Compressor": { categories: ["advanced"], keywords: ["wave-spring"] },
    "Submersible Pump": { categories: ["bellows"], keywords: ["rubber", "stainless"] }
  }
};
