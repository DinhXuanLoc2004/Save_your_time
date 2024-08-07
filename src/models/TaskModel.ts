export interface TaskModel {
  id?: string;
  title: string;
  desctiption: string;
  dueDate: Date;
  start: Date;
  end: Date;
  uids: string[];
  color?: string;
  attachments: Attachment[];
  progress: number,
}

export interface Attachment {
  name: string,
  url: string,
  size: number,
  type?: string
}

export interface SubTask {
  id?: string,
  title: string,
  description: string,
  isCompleted: boolean
}
