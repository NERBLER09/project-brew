import { tasksCompletedThisDay } from '$lib/stores/project';
import { userData } from '$lib/stores/user';
import { supabase } from '$lib/supabase';
import { get, writable, type Writable } from 'svelte/store';

interface Activity {
	date: string;
	formattedDate: string;
	tasksCompleted: number;
}
export let weeklyActivity: Writable<Activity[]> = writable([]);

export const addNewDay = async () => {
	if (!get(weeklyActivity).find((item) => item.date === getCurrentDate())) {
		tasksCompletedThisDay.set(0)
		localStorage.setItem('tasksCompletedToday', JSON.stringify(get(tasksCompletedThisDay)));

		const tempDueDate = new Date();
		let formattedDate = tempDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

		const date: Activity = {
			date: getCurrentDate(),
			formattedDate,
			tasksCompleted: 0
		};
		const weekActivity = [...get(weeklyActivity), date];
		weeklyActivity.set(weekActivity);

		await supabase.from("profiles").update({ "your_activity": weekActivity }).eq("id", get(userData).id)
	}
};

const getCurrentDate = (): string => {
	const date = new Date();

	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	return `${day}-${month}-${year}`;
};
