import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
  const { pages } = await event.parent();
  const pageId = event.params.page
  const page = pages.find(item => item.id === pageId);
  return { page }
}) satisfies LayoutServerLoad;
