export interface IActivity {
    id: number;
    description: string;
    responsableId: number;
    finalDate: string;
    daysRemaining?: number;
  }
