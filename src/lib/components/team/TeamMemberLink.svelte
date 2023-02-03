<script lang="ts">
	import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";

    export let id: string | undefined

    let name: string
    let avatar_url: string

    onMount(async() => {
        const {data: member, error} = await supabase.from("profiles").select().eq('id', id).limit(1).single();
        if(member) {
            name = member.name
        } 
    })
</script>

<a href="/app/team/{id}">
    <p class="font-bold text-grey-700 dark:text-grey-100">{name}</p>
</a>