import type { Message } from "./types";

export const initialMessages: Message[] = [
  {
    text: 'Привет, как дела?',
  },
  {
    text: 'Привет, отлично, твои как?',
    isMine: true,
  },
  {
    text: 'Мои - супер',
  },
  {
    text: 'Чем занимаешься?',
  },
]