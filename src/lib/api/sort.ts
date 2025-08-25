import type { SortOptions } from '$lib/stores/project';
import type { Task } from '$lib/types/projects';

export const handleSortingTasks = (tasks: Task[], option: SortOptions): Task[] => {
	if (!option.date && !option.status && !option.priority) return tasks;
	const sortedTasks = tasks;

	if (option.priority === 'descending') {
		sortedTasks.sort((a, b) => {
			const getPriority = (item) => {
				if (item.priority_level === "none") return 0
				else if (item.priority_level === "low") return 1
				else if (item.priority_level === "med") return 2
				else if (item.priority_level === "high") return 3
				else return 0
			}
			return getPriority(a) - getPriority(b)
		});
	} else if (option.priority === 'ascending') {
		sortedTasks.sort((a, b) => {
			const getPriority = (item) => {
				if (item.priority_level === "none") return 3
				else if (item.priority_level === "low") return 2
				else if (item.priority_level === "med") return 1
				else if (item.priority_level === "high") return 0
				else return 3
			}
			return getPriority(a) - getPriority(b)
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
