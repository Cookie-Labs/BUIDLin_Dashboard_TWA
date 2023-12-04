import { EventForm } from './eventInterface';
import allEvents from './events.json';
import publicEvents from './publicEvents.json'

export const eventsInProgress: EventForm[] = Object.keys(allEvents)
  .filter((eventId: string) => publicEvents.includes(eventId))
  .map((eventId: string) => {
    return {
      id: eventId,
      ...(allEvents as Record<string, any>)[eventId],
    } as EventForm;
  });