const router = require("express").Router();
const { Event } = require("../models");

// GET all events
router.get("/", async (req, res) => {
  try {
    const eventsData = await Event.findAll({
      attributes: [
        "id",
        "name",
        "address",
        "description",
        "date",
        "created_at",
        "user_id"
      ],
    });

    res.json(eventsData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE an event
router.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create({
      user_id: req.session.user_id
    });

    res.json(newEvent);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a single event
router.get("/:id", async (req, res) => {
  try {
    const singleEvent = await Event.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "name",
        "address",
        "description",
        "date",
        "created_at",
        "user_id",
        "comment_text",
        "reaction_id"
      ],
    });

    if (!singleEvent) {
      res.status(404).json({ message: "Can't find event" });
      return;
    }

    res.json(singleEvent);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT for updating event
router.put("/:id", async (req, res) => {
  try {
    const updateEvent = await Event.update(
       req.body,
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updateEvent) {
      res.status(404).json({ message: "Can't find event" });
      return;
    }

    res.json(updateEvent);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a event
router.delete("/:id", async (req, res) => {
  try {
    const deleteEvent = await Event.delete({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteEvent) {
      res.status(404).json({ message: "Can't find event" });
      return;
    }

    res.json(deleteEvent);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
