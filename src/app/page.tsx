"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { addBookAction, getBooksAction } from './actions';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    // Check authentication state on load
    supabase.auth.getUser().then(({ data }: { data: { user: any } }) => { // <-- Added explicit type here
      setUser(data.user);
      if (data.user) loadBooks();
      setLoading(false);
    });
  }, []);


  async function loadBooks() {
    const data = await getBooksAction();
    setBooks(data);
  }

  async function handleSignIn() {
    // This will send an instant login link directly to your email address!
    const email = prompt("Enter your email address to log in:");
    if (!email) return;
    
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: true, // Automatically registers you if you are new!
      }
    });

    if (error) alert(error.message);
    else alert("Check your email inbox for your secure login link!");
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await addBookAction(formData);
      (e.target as HTMLFormElement).reset();
      loadBooks(); // refresh list
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) return <div className="p-8">Loading application...</div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">My Personal Book Tracker</h1>
        <button onClick={handleSignIn} className="bg-black text-white px-6 py-2 rounded-md">
          Sign In with Email
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">📚 My Bookshelf</h1>
        <button onClick={() => supabase.auth.signOut().then(() => setUser(null))} className="text-sm text-red-500">
          Sign Out
        </button>
      </div>

      {/* Form: Triggering backend processing */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8 bg-gray-50 p-4 rounded-lg">
        <input name="title" placeholder="Book Title" required className="border p-2 rounded" />
        <input name="author" placeholder="Author" required className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Book to Database
        </button>
      </form>

      {/* Displaying database records */}
      <div className="space-y-3">
        {books.map((book) => (
          <div key={book.id} className="p-4 border rounded shadow-sm bg-white">
            <h3 className="font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">by {book.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
