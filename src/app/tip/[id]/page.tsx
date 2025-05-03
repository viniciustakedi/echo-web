import React from 'react';

const TipPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Tip Title</h1>
          <p className="text-gray-500">Published on October 10, 2023</p>
        </header>
        <section className="prose prose-lg">
          <p>
            This is the content of the tip. You can write detailed information here, just like a Medium post. Use this space to provide value to your readers.
          </p>
          <p>
            Remember to structure your content well, use headings, lists, and other elements to make it easy to read.
          </p>
        </section>
      </article>
    </div>
  );
};

export default TipPage;