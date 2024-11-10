import { writable } from 'svelte/store';
export const isLogin = writable(false);

export const alert = writable({
	show: false,
	color: 'green',
	message: 'alert message',
	status: 'success',
	timer: 1000
});
