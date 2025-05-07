import { MarkdownRenderer } from "@/components/markdown-renderer";
import Menu from "@/components/menu";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default async function ReviewPage({ params }: Props) {
  const { id } = params;

  // Mock data for demonstration purposes
  const review = {
    id,
    title: "Understanding Async/Await in JavaScript",
    publishedAt: "2023-03-15T12:00:00Z",
    content: `

![Banner](https://www.lospaghetto.com.br/img/banner1.png)
# Async/Await in JavaScript

Async/Await is a modern way to handle asynchronous operations in JavaScript. It makes your code look synchronous and is easier to read and debug.

## Example

Here is an example of using async/await:

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
\`\`\`

## Benefits

- Cleaner and more readable code
- Easier error handling with \`try/catch\`
- Works seamlessly with Promises

Happy coding!
    `,
  };

  if (!review) {
    notFound();
  }

  const { title, publishedAt, content } = review;

  return (
    <>
      <Menu />
      <main>
        <div className="max-w-3xl mx-auto px-6 pb-6 pt-32">
          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-2">{title}</h1>
              <p className="text-gray-500">
                Published on{" "}
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </header>

            <div className="markdown-body max-w-3xl mx-auto">
              <MarkdownRenderer content={content} />
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
