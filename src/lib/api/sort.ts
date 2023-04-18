import type { SortOptions } from '$lib/stores/project';
import type { Task } from '$lib/types/projects';

export const handleSortingTasks = (tasks: Task[], option: SortOptions): Task[] => {
	const sortedTasks = tasks;

	if (option.priority === 'ascending') {
		sortedTasks.sort((item) => {
			switch (item.priority_level) {
				case 'none':
					return 0;
				case 'low':
					return 1;
				case 'med':
					return 2;
				case 'high':
					return 3;
				default:
					return 0;
			}
		});
	} else if (option.priority === 'descending') {
		sortedTasks.sort((item) => {
			switch (item.priority_level) {
				case 'none':
					return 3;
				case 'low':
					return 2;
				case 'med':
					return 1;
				case 'high':
					return 0;
				default:
					return 3;
			}
		});
	}

	if (option.date === 'ascending') {
		sortedTasks.sort((item) => {
			if (!item.due_date) return 0;
			return new Date(item.due_date).getTime() - new Date().getTime();
		});
	} else if (option.date === 'descending') {
		sortedTasks.sort((item) => {
			if (!item.due_date) return 999;
			return new Date(item.due_date).getTime() - new Date().getTime();
		});
	}

	if (option.status === 'ascending') {
		sortedTasks.sort((item) => {
			switch (item.status) {
				case 'other':
					return 0;
				case 'todo':
					return 1;
				case 'doing':
					return 2;
				case 'done':
					return 3;
				default:
					return 0;
			}
		});
	} else if (option.status === 'descending') {
		sortedTasks.sort((item) => {
			switch (item.status) {
				case 'other':
					return 3;
				case 'todo':
					return 2;
				case 'doing':
					return 1;
				case 'done':
					return 0;
				default:
					return 3;
			}
		});
	}

	return sortedTasks;
};

export const handleSortClear = (options: SortOptions, originalTasks: Task[]) => {
	if (options.priority === null) {
		return originalTasks;
	} else if (options.date === null) {
		return originalTasks;
	}
};
