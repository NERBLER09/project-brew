import type { MilestoneFilter } from '$lib/stores/project';
import type { Task } from '$lib/types/projects';

type DateFilter = 'soon' | 'today' | 'overdue' | 'unset' | null;

export const handleFilter = (
  tasks: Task[],
  date: DateFilter,
  tags: string[],
  milestone: MilestoneFilter | null
): Task[] => {
  let filteredTasks = tasks;

  if (date) {
    switch (date) {
      case 'soon':
        filteredTasks = filteredTasks.filter((item) => {
          return (
            new Date(item.due_date).getTime() >= new Date().getTime() &&
            new Date(item.due_date).getTime() <= new Date().setDate(new Date().getDate() + 4)
          );
        });

        break;
      case 'today':
        filteredTasks = filteredTasks.filter((item) => {
          const date = new Date(item.due_date);
          const today = new Date();
          date.setDate(date.getDate() + 1);

          return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        });

        break;

      case 'overdue':
        filteredTasks = filteredTasks.filter((item) => {
          const date = new Date(item.due_date);
          const today = new Date();
          date.setDate(date.getDate() + 1);

          return date < today && date.getTime() !== 86400000;
        });
        break;
      case 'unset':
        filteredTasks = filteredTasks.filter((item) => {
          return !item.due_date;
        });
        break;
    }
  }

  if (tags && tags.length > 0) {
    filteredTasks = filteredTasks.filter((item: Task) => {
      return item.tags?.includes(tags.toString());
    });
  }

  if (milestone) {
    filteredTasks = filteredTasks.filter((item) => {
      return item.milestone === milestone.id;
    });
  }

  return filteredTasks;
};
