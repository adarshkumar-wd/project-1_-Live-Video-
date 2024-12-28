import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: '*'}));

// const api = 
// const CHANNEL_ID = process.env.CHANNEL_ID;

app.get('/live', async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.CHANNEL_ID}&eventType=live&type=video&key=${process.env.API_KEY}`
    );

    // console.log("data---",response.data.items);

    const videos = response.data.items;

    if (videos.length > 0) {
      const liveVideo = videos[0];
      res.send({
        liveVideoTitle: liveVideo.snippet.title,
        liveVideoURL: `https://www.youtube.com/watch?v=${liveVideo.id.videoId}`,
      });
    } else {
      res.send({ message: 'No live stream is currently active.' });
    }
} catch (error) {
    console.error('Error fetching live stream:', error.response ? error.response.data : error.message);
    res.status(500).send({ error: 'Error fetching live stream data.', details: error.response?.data || error.message });
  }
  
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
