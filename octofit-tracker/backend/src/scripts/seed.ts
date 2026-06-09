import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

console.log('Seed the octofit_db database with test data');

async function seed() {
  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const eliteRangers = await Team.create({
    name: 'OctoFit Rangers',
    description: 'A competitive crew focused on endurance and team challenges.',
    totalPoints: 1240
  });

  const pulsePatrol = await Team.create({
    name: 'Pulse Patrol',
    description: 'A balanced team built around recovery and strength.',
    totalPoints: 1110
  });

  const ava = await User.create({
    name: 'Ava Harper',
    email: 'ava.harper@octofit.com',
    role: 'Member',
    team: eliteRangers._id,
    totalPoints: 780
  });

  const noah = await User.create({
    name: 'Noah Quinn',
    email: 'noah.quinn@octofit.com',
    role: 'Coach',
    team: eliteRangers._id,
    totalPoints: 320
  });

  eliteRangers.coach = noah._id;
  eliteRangers.members = [ava._id, noah._id];
  await eliteRangers.save();

  const lena = await User.create({
    name: 'Lena Cruz',
    email: 'lena.cruz@octofit.com',
    role: 'Member',
    team: pulsePatrol._id,
    totalPoints: 610
  });

  const isaac = await User.create({
    name: 'Isaac Kim',
    email: 'isaac.kim@octofit.com',
    role: 'Coach',
    team: pulsePatrol._id,
    totalPoints: 500
  });

  pulsePatrol.coach = isaac._id;
  pulsePatrol.members = [lena._id, isaac._id];
  await pulsePatrol.save();

  await Activity.create([
    {
      user: ava._id,
      team: eliteRangers._id,
      type: 'Morning Run',
      durationMinutes: 35,
      caloriesBurned: 290,
      distanceKm: 6.3,
      date: new Date('2026-06-08T07:15:00Z')
    },
    {
      user: ava._id,
      team: eliteRangers._id,
      type: 'Strength Circuit',
      durationMinutes: 50,
      caloriesBurned: 420,
      date: new Date('2026-06-07T17:30:00Z')
    },
    {
      user: lena._id,
      team: pulsePatrol._id,
      type: 'Cycling Intervals',
      durationMinutes: 45,
      caloriesBurned: 380,
      distanceKm: 18.2,
      date: new Date('2026-06-08T06:45:00Z')
    },
    {
      user: isaac._id,
      team: pulsePatrol._id,
      type: 'Recovery Yoga',
      durationMinutes: 30,
      caloriesBurned: 140,
      date: new Date('2026-06-06T19:00:00Z')
    }
  ]);

  await Workout.create([
    {
      name: 'Full Body HIIT',
      category: 'Strength & Conditioning',
      difficulty: 'Intermediate',
      durationMinutes: 45,
      description: 'A fast-paced circuit workout that blends strength and cardio for full-body conditioning.'
    },
    {
      name: 'Recovery Yoga',
      category: 'Flexibility',
      difficulty: 'Beginner',
      durationMinutes: 30,
      description: 'A calming yoga flow focused on mobility, breathing, and muscle recovery.'
    },
    {
      name: 'Endurance Run',
      category: 'Cardio',
      difficulty: 'Advanced',
      durationMinutes: 60,
      description: 'A sustained run to build stamina and pacing over longer distances.'
    }
  ]);

  await Leaderboard.create([
    {
      team: eliteRangers._id,
      rank: 1,
      points: 1240,
      category: 'Overall'
    },
    {
      team: pulsePatrol._id,
      rank: 2,
      points: 1110,
      category: 'Overall'
    }
  ]);

  const [userCount, teamCount, activityCount, workoutCount, leaderboardCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Workout.countDocuments(),
    Leaderboard.countDocuments()
  ]);

  console.log('Seed complete:');
  console.log(`  users: ${userCount}`);
  console.log(`  teams: ${teamCount}`);
  console.log(`  activities: ${activityCount}`);
  console.log(`  workouts: ${workoutCount}`);
  console.log(`  leaderboard entries: ${leaderboardCount}`);
  await mongoose.connection.close();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
