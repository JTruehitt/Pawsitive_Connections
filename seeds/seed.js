const sequelize = require('../config/connection')
const { User, Comment, Post, Pet } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create users
  await User.bulkCreate([
    {
      first_name: "John",
      last_name: "Doe",
      user_name: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      user_name: "janesmith",
      email: "janesmith@example.com",
      password: "password456",
    },
    {
      first_name: "Michael",
      last_name: "Johnson",
      user_name: "mjohnson",
      email: "michaeljohnson@example.com",
      password: "password789",
    },
    {
      first_name: "Emily",
      last_name: "Davis",
      user_name: "edavis",
      email: "emilydavis@example.com",
      password: "passwordabc",
    },
    {
      first_name: "David",
      last_name: "Wilson",
      user_name: "dwilson",
      email: "davidwilson@example.com",
      password: "passworddef",
    },
  ]);

  // Create posts
  await Post.bulkCreate([
    {
      title: "Looking for Dog Playdates",
      body: "Hey everyone, I have a friendly Labrador and I'm looking to connect with other dog owners in the area for playdates. Let's schedule some fun outings!",
      user_id: 1,
    },
    {
      title: "Cat Lovers Meetup",
      body: "Calling all cat lovers! I'm organizing a meetup at the local park for a casual gathering of feline enthusiasts. Bring your cats and let's have a purrfect afternoon!",
      user_id: 2,
    },
    {
      title: "Lost Dog",
      body: "My neighbor's dog went missing yesterday. Please keep an eye out for a small brown Chihuahua named Coco. Let's help bring Coco back home!",
      user_id: 3,
    },
    {
      title: "Pet Training Tips",
      body: "Does anyone have recommendations for a good pet training class in the area? My puppy needs some obedience training, and I would appreciate any suggestions!",
      user_id: 4,
    },
    {
      title: "Adoptable Pets Event",
      body: "There's an adoptable pets event happening this weekend at the local shelter. If you're looking to add a furry friend to your family, don't miss out on this opportunity!",
      user_id: 5,
    },
    {
      title: "Bird Owners Unite",
      body: "Are there any bird owners in the neighborhood? I recently got a parakeet and would love to connect with fellow bird enthusiasts. Let's share tips and stories!",
      user_id: 1,
    },
    {
      title: "Emergency Vet Recommendation",
      body: "Unfortunately, my cat had a medical emergency last night, and I needed to rush him to a vet. I highly recommend XYZ Veterinary Clinic for their prompt and excellent care.",
      user_id: 2,
    },
    {
      title: "Pet-Friendly Housing",
      body: "Moving to a new place and looking for pet-friendly housing options. If you have any recommendations or know of available rentals, please let me know!",
      user_id: 3,
    },
    {
      title: "Grooming Services",
      body: "My dog needs a grooming session, and I'm searching for a reliable and affordable grooming service. Any suggestions or personal experiences to share?",
      user_id: 4,
    },
    {
      title: "Paws in the Park",
      body: "Mark your calendars! The annual 'Paws in the Park' event is happening next month. It's a fantastic opportunity to enjoy outdoor activities with your pets. Don't miss it!",
      user_id: 5,
    },
  ]);

  // Create comments
  await Comment.bulkCreate([
    {
      body: "My dog would love to join in on the playdates! Count us in!",
      user_id: 2,
      post_id: 1,
    },
    {
      body: "I'm excited for the cat lovers meetup! Can't wait to meet other cat enthusiasts!",
      user_id: 4,
      post_id: 2,
    },
    {
      body: "I'll keep an eye out for Coco and share the information with my friends in the area.",
      user_id: 1,
      post_id: 3,
    },
    {
      body: "I attended a great pet training class last month. I'll send you the details!",
      user_id: 3,
      post_id: 4,
    },
    {
      body: "I adopted my dog from that shelter! They have wonderful pets waiting for their forever homes.",
      user_id: 5,
      post_id: 4,
    },
    {
      body: "I have a beautiful parrot! Let's connect and share our experiences with bird ownership.",
      user_id: 2,
      post_id: 6,
    },
    {
      body: "I'm glad your cat received the care it needed. Thanks for the recommendation!",
      user_id: 4,
      post_id: 7,
    },
    {
      body: "I recently moved to a pet-friendly apartment complex. I'll send you the details in a private message.",
      user_id: 1,
      post_id: 8,
    },
    {
      body: "I highly recommend a local groomer. Their service is exceptional!",
      user_id: 3,
      post_id: 9,
    },
    {
      body: "Paws in the Park is always a blast! Looking forward to it!",
      user_id: 5,
      post_id: 10,
    },
  ]);

  // Create pets
  await Pet.bulkCreate([
    {
      name: "Max",
      age: 3,
      type: "Dog",
      gender: true,
      description: "Max is a playful and energetic dog looking for a loving home.",
      needsHome: true,
      goodWithKids: true,
      user_id: 1,
    },
    {
      name: "Whiskers",
      age: 5,
      type: "Cat",
      gender: false,
      description: "Whiskers is a friendly and cuddly cat who loves attention.",
      needsHome: true,
      goodWithKids: true,
      user_id: 2,
    },
    {
      name: "Rocky",
      age: 2,
      type: "Dog",
      gender: true,
      description: "Rocky is a brave and loyal dog who enjoys outdoor activities.",
      needsHome: true,
      goodWithKids: false,
      user_id: 3,
    },
    {
      name: "Nibbles",
      age: 1,
      type: "Hamster",
      gender: false,
      description: "Nibbles is a cute and curious hamster who loves exploring.",
      needsHome: true,
      goodWithKids: true,
      user_id: 4,
    },
    {
      name: "Bella",
      age: 4,
      type: "Dog",
      gender: false,
      description: "Bella is a gentle and affectionate dog who loves long walks.",
      needsHome: true,
      goodWithKids: true,
      user_id: 5,
    },
  ]);

  console.log("Seed data created successfully!");
};

seedDatabase();
