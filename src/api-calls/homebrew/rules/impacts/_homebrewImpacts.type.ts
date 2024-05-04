export interface HomebrewImpact {
  label: string;
  dataswornId: string;
  description?: string;
  shared: boolean;
  // ex: health, spirit
  preventsRecovery: string[];
  permanent: boolean;
}

export interface HomebrewImpactCategoryDocument {
  collectionId: string;
  label: string;
  description?: string;
  contents: {
    [impactKey: string]: HomebrewImpact;
  };
}
