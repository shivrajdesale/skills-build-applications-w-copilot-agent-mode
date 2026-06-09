import mongoose, { Document, Schema, Types, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  team?: Types.ObjectId;
  joinedAt: Date;
  totalPoints: number;
}

export interface ITeam extends Document {
  name: string;
  description: string;
  coach?: Types.ObjectId;
  members: Types.ObjectId[];
  totalPoints: number;
  createdAt: Date;
}

export interface IActivity extends Document {
  user: Types.ObjectId;
  team: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  date: Date;
}

export interface IWorkout extends Document {
  name: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  description: string;
}

export interface ILeaderboard extends Document {
  team: Types.ObjectId;
  rank: number;
  points: number;
  category: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  joinedAt: { type: Date, default: () => new Date() },
  totalPoints: { type: Number, default: 0 }
}, { timestamps: true });

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coach: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() }
});

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  distanceKm: { type: Number },
  date: { type: Date, required: true }
});

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  description: { type: String, required: true }
});

const LeaderboardSchema = new Schema<ILeaderboard>({
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  category: { type: String, required: true }
});

export const User = mongoose.models.User || model<IUser>('User', UserSchema);
export const Team = mongoose.models.Team || model<ITeam>('Team', TeamSchema);
export const Activity = mongoose.models.Activity || model<IActivity>('Activity', ActivitySchema);
export const Workout = mongoose.models.Workout || model<IWorkout>('Workout', WorkoutSchema);
export const Leaderboard = mongoose.models.Leaderboard || model<ILeaderboard>('Leaderboard', LeaderboardSchema);
