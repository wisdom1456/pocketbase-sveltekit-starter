import type { Handle, HandleError } from '@sveltejs/kit';

// Handle hook for authentication and route protection
export const handle: Handle = async ({ event, resolve }) => {
  const user = event.locals.user;

  if (event.url.pathname.startsWith('/admin') && !user) {
    return Response.redirect('/login');
  }

  return resolve(event);
};

// HandleError hook for global error handling
export const handleError: HandleError = async ({ error, event }) => {
  console.error('Error occurred:', error);
  return {
    status: 500,
    body: { message: 'An unexpected error occurred.' },
  };
};
