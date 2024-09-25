// app/api-page/page.tsx
import React from 'react';

// Define the shape of the fetched data
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// Function to fetch data
const fetchData = async (): Promise<Post> => {
    const max = 100
    const min = 1
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomNumber}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return await res.json();
}

// Server component to display the data
const ApiPage = async () => {
    const post: Post = await fetchData();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <p className="mb-2"> An amazing title: {post.title}</p>
                    <p className="mb-2"> An amazing body: {post.body}</p>
                </ol>
            </main>
        </div>
);
}

export default ApiPage;