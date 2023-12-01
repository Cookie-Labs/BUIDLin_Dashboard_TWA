import { EventForm } from './eventInterface';
import allEvents from './events.json';
import ongoingEvents from './eventsOngoing.json';
import completedEvents from './eventsCompleted.json';

export const eventsInProgress: EventForm[] = Object.keys(allEvents)
  .filter((eventId: string) => ongoingEvents.includes(eventId))
  .map((eventId: string) => {
    return {
      id: eventId,
      ...(allEvents as Record<string, any>)[eventId],
    } as EventForm;
  });

export const eventsEnded: EventForm[] = Object.keys(allEvents)
  .filter((eventId: string) => completedEvents.includes(eventId))
  .map((eventId: string) => {
    return {
      id: eventId,
      ...(allEvents as Record<string, any>)[eventId],
    } as EventForm;
  });