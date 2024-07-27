// Enum for preesh heaviness
export enum PreeshHeaviness {
    LOWKEY = 'LOWKEY',
    HEAVY = 'HEAVY',
    HEAVYFR = 'HEAVYFR',
    SUPERPREESH = 'SUPERPREESH'
  }
  
  // Beast type
  export interface Beast {
    id: number;
    gamerTag: string;
    email: string;
    authoredPreesh?: Preesh[];
    receivedPreesh?: Preesh[];
    prees?: Preesh[];
    createdAt: Date;
    updatedAt: Date;
    comments?: Comment[];
  }
  
  // Preesh type
  export interface Preesh {
    id: number;
    text: string;
    author: Beast;
    authorId: number;
    receiver: Beast;
    receiverId: number;
    prees?: Beast[];
    praysh: boolean;
    heaviness: PreeshHeaviness;
    createdAt: Date;
    updatedAt: Date;
    comments?: Comment[];
  }
  
  // Comment type
  export interface Comment {
    id: number;
    text: string;
    preesh: Preesh;
    preeshId: number;
    author: Beast;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
  }