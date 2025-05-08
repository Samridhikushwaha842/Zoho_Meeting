const axios = require('axios');

class ZohoMeetingService {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async authenticate() {
    const response = await axios.post(
      'https://accounts.zoho.com/oauth/v2/token',
      {
        grant_type: 'client_credentials',
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        scope: 'ZohoMeeting.meetings.CREATE'
      }
    );

    this.accessToken = response.data.access_token;
    this.tokenExpiry = Date.now() + response.data.expires_in * 1000;
  }

  async createMeeting(meetingData) {
    if (!this.accessToken || Date.now() >= this.tokenExpiry) {
      await this.authenticate();
    }

    const response = await axios.post(
      'https://meeting.zoho.com/api/v2/meetings',
      {
        topic: meetingData.topic,
        agenda: meetingData.agenda,
        start_time: meetingData.startTime.toISOString(),
        duration: meetingData.duration,
        host_email: meetingData.hostEmail,
        type: 'Scheduled'
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      meeting_id: response.data.data.id,
      meeting_url: response.data.data.join_url,
      host_email: response.data.data.host_email
    };
  }
}

module.exports = new ZohoMeetingService();
