'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const [streak] = useState(7);
  const [goalsProgress, setGoalsProgress] = useState(65); 

  const recentPages = [
    { id: 1, title: 'My First Page', date: '2024-09-01' },
    { id: 2, title: 'Second Entry', date: '2024-09-02' },
  ];

  const milestones = [
    { id: 1, title: 'Wrote 10 Pages', date: '2024-08-30' },
    { id: 2, title: '100 Days Streak', date: '2024-08-25' },
  ];

  const upcomingGoals = [
    { id: 1, title: 'Finish 5 Pages', dueDate: '2024-09-10' },
    { id: 2, title: 'Publish First Article', dueDate: '2024-09-15' },
  ];

  return (
    <div className="container ml-32 p-4 w-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Streak Counter */}
      <Card className="p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Daily Progress Tracker</h2>
        <p className="text-lg">You’ve written for {streak} days in a row!</p>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <Link href="/page/new">
            <Button>Write a New Page</Button>
          </Link>
        </Card>
        <Card className="p-4">
          <Link href="/goals/new">
            <Button>Set New Goal</Button>
          </Link>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Recent Pages</h2>
          <ul className="mt-2 space-y-1">
            {recentPages.map((page) => (
              <li key={page.id}>
                <Link href={`/pages/${page.id}`} className="underline">
                  {page.title} - {page.date}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Goals Overview */}
      <Card className="p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Goal Overview</h2>
        <Progress value={goalsProgress} className="w-full" />
        <p className="mt-2">You’ve completed {goalsProgress}% of your current goals.</p>
      </Card>

      {/* Milestones & Achievements */}
      <Card className="p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Milestones & Achievements</h2>
        <ul className="mt-2 space-y-1">
          {milestones.map((milestone) => (
            <li key={milestone.id}>
              <Badge variant="outline">{milestone.title}</Badge> - {milestone.date}
            </li>
          ))}
        </ul>
      </Card>

      {/* Upcoming Reminders/Goals */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-2">Upcoming Goals</h2>
        <ul className="mt-2 space-y-1">
          {upcomingGoals.map((goal) => (
            <li key={goal.id}>
              <Badge>{goal.title}</Badge> - Due on {goal.dueDate}
            </li>
          ))}
        </ul>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card className="p-4">
          <Link href="/profile/username">
            <Button>Profile</Button>
          </Link>
        </Card>
        <Card className="p-4">
          <Link href="/explore">
            <Button>Explore Public Pages</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
