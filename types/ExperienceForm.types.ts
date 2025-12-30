
export interface ExperienceFormValues {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  bannerImageUrl: string;

  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];

  subImageUrls: string[];
}
