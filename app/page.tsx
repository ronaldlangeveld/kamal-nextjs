import Message, { ensureSync } from "@/db/models/Message";
import { revalidatePath } from "next/cache";

async function addMessage(formData: FormData) {
  "use server";
  
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;
  
  if (name && message) {
    await ensureSync();
    await Message.create({ name, message });
    revalidatePath("/");
  }
}

export default async function Home() {
  await ensureSync();
  
  const messages = await Message.findAll({
    order: [["createdAt", "DESC"]],
    limit: 50,
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-zinc-900 dark:text-zinc-50">
          Guestbook
        </h1>
        
        {/* Add Message Form */}
        <form action={addMessage} className="mb-12 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={3}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 py-2 px-4 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Sign Guestbook
          </button>
        </form>

        {/* Messages List */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400">No messages yet. Be the first to sign!</p>
          ) : (
            messages.map((msg: any) => (
              <div key={msg.id} className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{msg.name}</h3>
                  <time className="text-sm text-zinc-500 dark:text-zinc-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300">{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
