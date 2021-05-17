const express = require('express');
const router = express.Router();

// Load song model
const Song = require('../../models/song');

// @route GET api/songs/test
// @description tests songs route
// @access Public
router.get('/test', (req, res) => res.send('song route testing!'));

// @route GET api/songs
// @description Get all songs
// @access Public
router.get('/', (req, res) => {
    Song.find()
        .then(songs => res.json(songs))
        .catch(err => res.status(404).json({ nosongsfound: 'No songs found' }));
});

// @route GET api/songs/:id
// @description Get song by id
// @access Public
router.get('/:id', (req, res) => {
    Song.findById(req.params.id)
        .then(song => res.json(song))
        .catch(err => res.status(404).json({ nosongfound: 'No Song Found' }));
});

// @route GET api/songs
// @description add/save song
// @access Public
router.post('/create-song', (req, res) => {
    Song.create(req.body)
        .then(song => res.json({ msg: 'song added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this song' }));
});

// @route GET api/songs/:id
// @description Update song
// @access Public
router.put('/:id', (req, res) => {
    Song.findByIdAndUpdate(req.params.id, req.body)
        .then(song => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

// @route GET api/songs/:id
// @description Delete song by id
// @access Public
router.delete('/:id', (req, res) => {
    Song.findByIdAndRemove(req.params.id, req.body)
        .then(song => res.json({ mgs: 'song song deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a song' }));
});

module.exports = router;