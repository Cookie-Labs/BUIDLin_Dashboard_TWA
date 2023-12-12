export interface AwardForm {
  rank: string;
  teamCount: number;
  prize: number;
  currency: string;
  emoji: string;
}

export interface TelegramForm {
  name: string;
  link: string;
  iconUrl?: string;
}

export interface LocationForm {
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface ScheduleForm {
  date: number;
  programs?: {
    time: string;
    title: string;
    emoji: string;
  }[];
}

export interface SpeakersForm {
  imgUrl: string;
  name: string;
  position: string;
}

export interface OrganizerForm {
  imgUrl: string;
  name: string;
}

export interface SponsorsForm {
  imgUrl: string;
  name: string;
}

export interface QuestionForm {
  question: string;
  type: 'open' | 'binary' | 'single' | 'multiple' | 'hidden' | 'consent';
  required: boolean;
  options?: string[];
  hiddenQuestion?: QuestionForm[];
}

export interface ApplyForm {
  title: string;
  introduction?: string;
  link?: {
    url: string;
    name?: string;
  }[];
  questions?: QuestionForm[];
}

export interface TicketForm {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
}

export interface EventForm {
  id: string;
  posterImgUrl: string;
  hostTelegramId: number[];
  host: string;
  hostImgUrl: string;
  title: string;
  description: string;
  deadline: number;
  award?: AwardForm[];
  telegram?: TelegramForm[];
  country: string;
  location: LocationForm;
  schedule: ScheduleForm[];
  speakers?: SpeakersForm[];
  organizers?: OrganizerForm[];
  sponsors?: SponsorsForm[];
  applyForm?: ApplyForm[];
  tickets?: TicketForm[];
}
