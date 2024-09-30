export type BannerType = 'info' | 'warning' | 'error';

export interface IBanner {
  message: string;
  isVisible: boolean;
  type: BannerType;
}
