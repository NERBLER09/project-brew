import type { SortOptions } from '$lib/stores/project';
import type { Task } from '$lib/types/projects';

export const handleSortingTasks = (tasks: Task[], option: SortOptions): Task[] => {
	let sortedTasks = tasks;

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

	return sortedTasks;
};

export const handleSortClear = (options: SortOptions, originalTasks: Task[]): Task[] => {
	if (options.priority === null) {
		return originalTasks;
	}
};
