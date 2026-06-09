import { Router, Request, Response } from 'express';

const router = Router();

router.get('/users', (_req: Request, res: Response) => {
  res.json({
    users: [
      { id: 'user-1', name: 'Ava Harper', role: 'Member' },
      { id: 'user-2', name: 'Noah Quinn', role: 'Coach' }
    ]
  });
});

router.get('/teams', (_req: Request, res: Response) => {
  res.json({
    teams: [
      { id: 'team-1', name: 'OctoFit Rangers', members: 12 },
      { id: 'team-2', name: 'Pulse Patrol', members: 8 }
    ]
  });
});

router.get('/activities', (_req: Request, res: Response) => {
  res.json({
    activities: [
      { id: 'activity-1', name: 'Morning Run', duration: 35, calories: 290 },
      { id: 'activity-2', name: 'Strength Circuit', duration: 50, calories: 420 }
    ]
  });
});

router.get('/leaderboard', (_req: Request, res: Response) => {
  res.json({
    leaderboard: [
      { rank: 1, team: 'OctoFit Rangers', points: 1240 },
      { rank: 2, team: 'Pulse Patrol', points: 1110 }
    ]
  });
});

router.get('/workouts', (_req: Request, res: Response) => {
  res.json({
    workouts: [
      { id: 'workout-1', name: 'Full Body HIIT', duration: 45 },
      { id: 'workout-2', name: 'Recovery Yoga', duration: 30 }
    ]
  });
});

export default router;
