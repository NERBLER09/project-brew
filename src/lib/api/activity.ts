import { tasksCompletedThisDay } from '$lib/stores/project';
import { get, writable, type Writable } from 'svelte/store';

interface Activity {
	date: string;
	formattedDate: string;
	tasksCompleted: number;
}
export let weeklyActivity: Writable<Activity[]> = writable([]);

export const addNewDay = () => {
	if (!get(weeklyActivity).find((item) => item.date === getCurrentDate())) {
		const tempDueDate = new Date();
		let formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

		const date: Activity = {
			date: getCurrentDate(),
			formattedDate,
			tasksCompleted: 0
		};
		const weekActivity = [...get(weeklyActivity), date];
		weeklyActivity.set(weekActivity);

		localStorage.setItem('weeklyActivity', JSON.stringify(weekActivity));
	}
	else {
		tasksCompletedThisDay.set(0)
		localStorage.setItem('tasksCompletedToday', JSON.stringify(get(tasksCompletedThisDay)));
	}
};

const getCurrentDate = (): string => {
	const date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	return `${day}-${month}-${year}`;
};
