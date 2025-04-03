export interface SubmenuItem {
    id: string;              // Unique identifier (e.g., "scrapeyard")
    name: string;            // Display name (e.g., "Scrapeyard")
    description: string;     // Short description of the item
    cost: {                  // Resource costs
      metal: number;
      water: number;
      oil: number;
    };
    production: boolean;     // Whether the item is a production building
    imageUrl: string;       // Path to the image asset
    isImproveable: boolean; // Whether the item can be improved
    currentLevel?: number;  // Current improvement level (optional)
    productionDuration?: number; // Duration for production (optional)

  }