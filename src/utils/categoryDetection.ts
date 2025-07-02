
interface CategoryKeywords {
  [key: string]: string[];
}

interface LocationCategory {
  [key: string]: string;
}

const CATEGORY_KEYWORDS: CategoryKeywords = {
  dining: [
    'restaurant', 'cafe', 'coffee', 'pizza', 'burger', 'sushi', 'food', 'eat', 'dine',
    'starbucks', 'mcdonalds', 'kfc', 'subway', 'dominos', 'chipotle', 'panera',
    'lunch', 'dinner', 'breakfast', 'brunch', 'takeout', 'delivery', 'uber eats',
    'doordash', 'grubhub', 'postmates'
  ],
  gas: [
    'gas', 'fuel', 'gasoline', 'petrol', 'shell', 'exxon', 'bp', 'chevron',
    'mobil', 'texaco', 'station', 'pump'
  ],
  groceries: [
    'grocery', 'supermarket', 'walmart', 'target', 'kroger', 'safeway', 'publix',
    'whole foods', 'trader joes', 'costco', 'sams club', 'food lion', 'wegmans',
    'market', 'produce', 'organic', 'fresh'
  ],
  travel: [
    'hotel', 'flight', 'airline', 'airport', 'booking', 'expedia', 'airbnb',
    'uber', 'lyft', 'taxi', 'rental car', 'hertz', 'enterprise', 'avis',
    'vacation', 'trip', 'travel', 'delta', 'american airlines', 'united'
  ],
  online: [
    'amazon', 'ebay', 'etsy', 'shop', 'store', 'online', 'web', 'digital',
    'app store', 'google play', 'steam', 'netflix', 'subscription'
  ],
  streaming: [
    'netflix', 'hulu', 'disney', 'amazon prime', 'spotify', 'apple music',
    'youtube', 'streaming', 'subscription', 'entertainment', 'music', 'video'
  ]
};

const LOCATION_CATEGORIES: LocationCategory = {
  'restaurant': 'dining',
  'cafe': 'dining',
  'gas station': 'gas',
  'grocery store': 'groceries',
  'hotel': 'travel',
  'airport': 'travel'
};

export const detectCategory = (input: string): string | null => {
  const normalizedInput = input.toLowerCase().trim();
  
  // Check for exact location matches first
  for (const [location, category] of Object.entries(LOCATION_CATEGORIES)) {
    if (normalizedInput.includes(location)) {
      return category;
    }
  }
  
  // Check for keyword matches
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (normalizedInput.includes(keyword)) {
        return category;
      }
    }
  }
  
  return null;
};

export const getCategoryConfidence = (input: string, detectedCategory: string): number => {
  const normalizedInput = input.toLowerCase().trim();
  const keywords = CATEGORY_KEYWORDS[detectedCategory] || [];
  
  let matchCount = 0;
  for (const keyword of keywords) {
    if (normalizedInput.includes(keyword)) {
      matchCount++;
    }
  }
  
  return Math.min(matchCount / keywords.length * 100, 100);
};

export const getSuggestedAmount = (category: string): number[] => {
  const suggestions = {
    dining: [15, 25, 50, 75],
    gas: [30, 50, 75, 100],
    groceries: [50, 100, 150, 200],
    travel: [100, 200, 500, 1000],
    online: [25, 50, 100, 200],
    streaming: [10, 15, 20, 30],
    general: [25, 50, 100, 200]
  };
  
  return suggestions[category] || suggestions.general;
};
