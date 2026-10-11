"use server"
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { isValidTitle } from '../utils/validate';

// Helper to start Supabase on the backend server
async function getBackendSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet: any[]) { // <-- Added : any[] type right here
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) 
        },
      },
    }

  );
}

// BACKEND: Add a book
export async function addBookAction(formData: FormData) {
  const supabase = await getBackendSupabase();
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;

  // 1. Backend Security Check: Is the user logged in?
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // 2. Backend Validation Check: Is the title valid?
  if (!isValidTitle(title)) {
    throw new Error("Invalid title length!");
  }

  // 3. Database Operation: Save it!
  const { error } = await supabase.from('books').insert({
    title,
    author,
    user_id: user.id
  });

  if (error) throw error;
}

// BACKEND: Fetch all books belonging to the logged-in user
export async function getBooksAction() {
  const supabase = await getBackendSupabase();
  const { data } = await supabase.from('books').select('*').order('created_at', { ascending: false });
  return data || [];
}
