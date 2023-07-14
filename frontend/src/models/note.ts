export interface Note {
    _id: string;
    title: string;
    text?: string;
    createdAt: string;
    updatedAt: string;
    images?: string[]; // Array of strings representing image URLs or paths
  }
