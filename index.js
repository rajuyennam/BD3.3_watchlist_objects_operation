const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let watchlist = [
  {
    videoId: 1,
    title: 'Javascript Tutorial',
    watched: false,
    url: 'https://youtu.be/shorturl1',
  },
  {
    videoId: 2,
    title: 'Node Js Tutorial',
    watched: true,
    url: 'https://youtu.be/shorturl2',
  },
  {
    videoId: 3,
    title: 'React Js Tutorial',
    watched: false,
    url: 'https://youtu.be/shorturl3',
  },
];

function updateWatchedStatusById(watchList, videoId, watched) {
  for (let i = 0; i < watchList.length; i++) {
    if (watchlist[i].videoId === videoId) {
      watchList[i].watched = watched;
    }
  }
  return watchList;
}

app.get('/watchlist/update', (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let watched = req.query.watched === 'true';
  let results = updateWatchedStatusById(watchlist, videoId, watched);
  res.json(results);
});

function updateAllVideosWatchedStatus(watchList, watched) {
  for (let i = 0; i < watchList.length; i++) {
    watchList[i].watched = watched;
  }
  return watchList;
}

app.get('/watchlist/update-all', (req, res) => {
  let watched = req.query.watched === 'true';
  let results = updateAllVideosWatchedStatus(watchlist, watched);
  res.json(results);
});

function shouldDeleteById(video, videoId) {
  return video.videoId != videoId;
}
app.get('/watchlist/delete', (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let results = watchlist.filter((video) => shouldDeleteById(video, videoId));
  res.json(results);
});

function isWatched(video) {
  return !video.watched;
}
app.get('/watchlist/delete-watched', (req, res) => {
  let results = watchlist.filter((video) => isWatched(video));
  res.json(results);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
