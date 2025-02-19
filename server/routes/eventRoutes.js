// routes/eventRoutes.js
router.put('/:id/book', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event.ticketsAvailable > 0) {
            event.ticketsAvailable -= 1;
            await event.save();
            res.status(200).json({ message: 'Ticket booked successfully!' });
        } else {
            res.status(400).json({ message: 'No tickets available' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
