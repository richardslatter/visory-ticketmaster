import React, { useState } from 'react';

interface EventSearchForm {
    startTime: string;
    endTime: string;
}

const SearchEvents = () => {
    const [formData, setFormData] = useState<EventSearchForm>({ startTime: '', endTime: '' });
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_KEY = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const appendSecondsAndZ = (dateTime: string) => {
        return `${dateTime}:00Z`;
    };

    const fetchEvents = async () => {
        setIsLoading(true);
        setError(null);

        const formattedStartTime = appendSecondsAndZ(formData.startTime);
        const formattedEndTime = appendSecondsAndZ(formData.endTime);

        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=${API_KEY}&locale=*&startDateTime=${formattedStartTime}&endDateTime=${formattedEndTime}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data._embedded.events);
        } catch (error) {
            setError('Failed to load events');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchEvents();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="startTime">Start Time:</label>
                    <input type="datetime-local" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="endTime">End Time:</label>
                    <input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} />
                </div>
                <button type="submit">Search Events</button>
            </form>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchEvents;
