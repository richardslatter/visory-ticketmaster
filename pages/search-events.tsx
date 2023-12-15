import React, { useState } from 'react';
import styles from './search-events.module.css'

interface EventSearchForm {
    startTime: string;
    endTime: string;
    countryCode: string;
}

const SearchEvents = () => {
    const [formData, setFormData] = useState<EventSearchForm>({ startTime: '', endTime: '', countryCode: 'US' });
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_KEY = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchEvents = async () => {
        setIsLoading(true);
        setError(null);

        const queryParams = new URLSearchParams();

        if (API_KEY) {
            queryParams.append('apikey', API_KEY);
        }

        if (formData.startTime) {
            queryParams.append('startDateTime', `${formData.startTime}:00Z`);
        }

        if (formData.endTime) {
            queryParams.append('endDateTime', `${formData.endTime}:00Z`);
        }

        if (formData.countryCode) {
            queryParams.append('countryCode', formData.countryCode);
        }

        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${queryParams.toString()}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data._embedded?.events || []);
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
        <div className={styles.container}> {/* Use the class from CSS module */}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="startTime" className={styles.label}>Start Time:</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="endTime" className={styles.label}>End Time:</label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="countryCode" className={styles.label}>Country:</label>
                    <select name="countryCode" value={formData.countryCode} onChange={handleChange} className={styles.select}>
                    <option value="US">United States Of America</option>
                    <option value="AD">Andorra</option>
                    <option value="AI">Anguilla</option>
                    <option value="AR">Argentina</option>
                    <option value="AU">Australia</option>
                    <option value="AT">Austria</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="BS">Bahamas</option>
                    <option value="BH">Bahrain</option>
                    <option value="BB">Barbados</option>
                    <option value="BE">Belgium</option>
                    <option value="BM">Bermuda</option>
                    <option value="BR">Brazil</option>
                    <option value="BG">Bulgaria</option>
                    <option value="CA">Canada</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="HR">Croatia</option>
                    <option value="CY">Cyprus</option>
                    <option value="CZ">Czech Republic</option>
                    <option value="DK">Denmark</option>
                    <option value="DO">Dominican Republic</option>
                    <option value="EC">Ecuador</option>
                    <option value="EE">Estonia</option>
                    <option value="FO">Faroe Islands</option>
                    <option value="FI">Finland</option>
                    <option value="FR">France</option>
                    <option value="GE">Georgia</option>
                    <option value="DE">Germany</option>
                    <option value="GH">Ghana</option>
                    <option value="GI">Gibraltar</option>
                    <option value="GB">Great Britain</option>
                    <option value="GR">Greece</option>
                    <option value="HK">Hong Kong</option>
                    <option value="HU">Hungary</option>
                    <option value="IS">Iceland</option>
                    <option value="IN">India</option>
                    <option value="IE">Ireland</option>
                    <option value="IL">Israel</option>
                    <option value="IT">Italy</option>
                    <option value="JM">Jamaica</option>
                    <option value="JP">Japan</option>
                    <option value="KR">Korea, Republic of</option>
                    <option value="LV">Latvia</option>
                    <option value="LB">Lebanon</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MY">Malaysia</option>
                    <option value="MT">Malta</option>
                    <option value="MX">Mexico</option>
                    <option value="MC">Monaco</option>
                    <option value="ME">Montenegro</option>
                    <option value="MA">Morocco</option>
                    <option value="NL">Netherlands</option>
                    <option value="AN">Netherlands Antilles</option>
                    <option value="NZ">New Zealand</option>
                    <option value="ND">Northern Ireland</option>
                    <option value="NO">Norway</option>
                    <option value="PE">Peru</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="RO">Romania</option>
                    <option value="RU">Russian Federation</option>
                    <option value="LC">Saint Lucia</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="RS">Serbia</option>
                    <option value="SG">Singapore</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="ZA">South Africa</option>
                    <option value="ES">Spain</option>
                    <option value="SE">Sweden</option>
                    <option value="CH">Switzerland</option>
                    <option value="TW">Taiwan</option>
                    <option value="TH">Thailand</option>
                    <option value="TT">Trinidad and Tobago</option>
                    <option value="TR">Turkey</option>
                    <option value="UA">Ukraine</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="UY">Uruguay</option>
                    <option value="VE">Venezuela</option>
                </select>
                </div>
                <button type="submit" className={styles.button}>Search Events</button>
            </form>
            {isLoading && <p className={styles.loading}>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchEvents;
