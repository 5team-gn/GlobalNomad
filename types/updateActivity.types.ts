export interface UpdateScheduleDto {
  date: string;
  startTime: string;
  endTime: string;
}

export interface UpdateMyActivityBodyDto {
  title?: string;
  category?: string;
  description?: string;
  price?: number;
  address?: string;
  bannerImageUrl?: string;

  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];

  scheduleIdsToRemove?: number[];
  schedulesToAdd?: UpdateScheduleDto[];
}