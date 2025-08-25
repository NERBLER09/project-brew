// Includes commonly used and related functions for user auth

import { goto } from '$app/navigation';
import { signUpEmail } from '$lib/stores/user';
import { supabase } from '$lib/supabase';

const handleEmailPasswordLogin = async (email: string, password: string) => {
	const { error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) return new Error(`Failed to login user: ${error.message}`);
	else goto('/app/home');
};

const handleUserSignUp = async (email: string, password: string) => {
	const { error } = await supabase.auth.signUp({
		email,
		password
	});

	if (error) return new Error(`Failed to sign up user: ${error.message}`);
	else {
		localStorage.setItem("email", email)
		signUpEmail.set(email);
		goto('/verify');
	}
};

const handleGoogleAuth = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${document.baseURI}/app/home`
		}
	});

	if (error) return new Error(`Google auth failed: ${error.message}`);
};

const signOut = async () => {
	await supabase.auth.signOut();
	goto('/');
};

export { handleEmailPasswordLogin, handleUserSignUp, handleGoogleAuth, signOut };
