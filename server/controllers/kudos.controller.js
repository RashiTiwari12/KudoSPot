const Kudos = require("../models/kudos.model");

async function handlePostKudos(req, res) {
  const { toperson, badge, reason, user } = req.body;
  console.log(user);
  if (!toperson || !badge || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Creating new Kudos document in the database
    const kudos = await Kudos.create({ toperson, badge, reason, user });

    // Return a success message
    return res
      .status(201)
      .json({ message: `Kudos created for ${toperson}`, kudos });
  } catch (error) {
    console.error("Error creating kudos:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getKudos = async (req, res) => {
  try {
    const kudos = await Kudos.find({});

    res.status(200).json(kudos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getTopKudosPerson(req, res) {
  try {
    const kudos = await Kudos.find();

    const kudosCount = {}; // This will store the number of kudos for each person

    // Loop through each kudo and count the kudos for each person
    kudos.forEach((kudo) => {
      const person = kudo.toperson; // Get the person who received the kudos

      // If this person has already been added, increment their kudos count
      if (kudosCount[person]) {
        kudosCount[person] += 1;
      } else {
        // If it's the first time this person is receiving kudos, set their count to 1
        kudosCount[person] = 1;
      }
    });

    // Sort people by the number of kudos (highest first)
    const sortedKudos = Object.entries(kudosCount) // Convert the object to an array of [person, count]
      .sort((a, b) => b[1] - a[1]) // Sort by the count (second item of the array)
      .slice(0, 4); // Take only the top 4 people

    //  Format the result
    const top4Kudos = sortedKudos.map(([person, count]) => ({
      topPerson: person, // Person's name
      kudosCount: count, // Number of kudos they received
    }));

    //  Send the result as a response
    if (top4Kudos.length > 0) {
      res.status(200).json(top4Kudos); // Send the top 4 people
    } else {
      res.status(404).json({ message: "No kudos found." }); // No kudos found
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" }); // Server error
  }
}
async function getTopBadges(req, res) {
  try {
    //  Fetch all kudos
    const kudos = await Kudos.find();

    // : Count kudos for each badge
    const badgeCount = {};

    kudos.forEach((kudo) => {
      const badge = kudo.badge; // The badge received

      if (badgeCount[badge]) {
        badgeCount[badge] += 1; // Increment the count if the badge already exists
      } else {
        badgeCount[badge] = 1; // Initialize the count if it's the first time
      }
    });

    //  Sort badges by count in descending order
    const sortedBadges = Object.entries(badgeCount)
      .sort((a, b) => b[1] - a[1]) // Sort by count (second element of the entry)
      .slice(0, 4); // Get top 4 badges

    //  Return the top 4 badges
    if (sortedBadges.length > 0) {
      res.status(200).json({
        topBadges: sortedBadges.map(([badge, count]) => ({
          badge,
          count,
        })),
      });
    } else {
      res.status(404).json({ message: "No badges found." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function handleLikeKudos(req, res) {
  const { kudoId, likedby } = req.body; // Receive the kudos ID and the user liking it

  // Validate that user is provided and has a valid email or identifier
  if (!likedby || typeof likedby !== "string") {
    return res.status(400).json({ message: "Invalid user data" });
  }

  try {
    // Find the kudos by ID
    const kudo = await Kudos.findById(kudoId);

    if (!kudo) {
      return res.status(404).json({ message: "Kudos not found" });
    }

    // Check if the user has already liked the kudos

    if (kudo.likedBy.includes(likedby)) {
      return res.status(400).json({
        message: "You have already liked this kudo",
        error: `User ${likedby} has already liked the kudos with ID: ${kudoId}`,
      });
    }

    // Add the user to the likedBy array
    kudo.likedBy.push(likedby);

    // Save the updated kudos document
    await kudo.save();

    // Return the updated kudos data with a success message
    res.status(200).json({
      message: "Kudos liked successfully",
      kudo: {
        id: kudo._id,
        toperson: kudo.toperson,
        badge: kudo.badge,
        reason: kudo.reason,
        user: kudo.user,
        likedBy: kudo.likedBy, // Return the updated likedBy list
        totalLikes: kudo.likedBy.length, // Return the total likes count
      },
    });
  } catch (error) {
    console.error("Error liking kudos:", error.message);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  handlePostKudos,
  getKudos,
  getTopKudosPerson,
  getTopBadges,
  handleLikeKudos,
};
