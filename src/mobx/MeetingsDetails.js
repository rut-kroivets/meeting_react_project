import { observable, action, makeObservable, computed } from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';
class meetingsDetails {
    meetings = [{
        id: "758",
        serviceType: "11",
        dateTime: "2023-12-28T10:00:00.000Z",//מבנה של תאריך ושעה סטנדרטי בjs
        clientName: "אבי כהן",
        clientPhone: "050-1234567",
        clientEmail: "m@m.com",
    },
    {
        id: "759",
        serviceType: "22",
        dateTime: "2021-07-20T10:00:00.000Z",//מבנה של תאריך ושעה סטנדרטי בjs
        clientName: "אבי כהן",
        clientPhone: "052-7165984",
        clientEmail: "s@m.com",
    }];
    constructor() {
        makeObservable(this, {
            meetings: observable,
            postMeeting: action,
            getMeetings: computed
        })
        for (let i = 0; i < this.meetings.length; i++) {
            this.postMeeting(this.meetings[i]);
        }

    }
    get getMeetings() {
        axios.get("http://localhost:8787/appointments").then((res) => {
            runInAction(() => {
                this.meetings = res.data;
            })
        });
        return this.meetings;
    }

    async postMeeting(s) {
        const response = await fetch("http://localhost:8787/appointment", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(s)
        }).catch(error => {
            console.error('Error:', error);
        });
        if (!response.ok) {
            console.error(`Error: ${response.status}`);
            return false;
        }

        return true;
    }
}
export default new meetingsDetails();