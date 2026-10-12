export interface KeyPoint {
  title: string;
  original?: string;
  description: string;
  modernApplication: string;
}

export interface Book {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  era: string;
  essence: string;
  accent: string;
  accentSoft: string;
  keyPoints: KeyPoint[];
}

export type CardCategory =
  | "人間関係"
  | "仕事・キャリア"
  | "心の平穏"
  | "決断・タイミング"
  | "自己成長"
  | "リーダーシップ"
  | "情報・思考";

export interface FlashCard {
  id: string;
  bookId: string;
  category: CardCategory;
  situation: string;
  quote: string;
  meaning: string;
  advice: string;
}
