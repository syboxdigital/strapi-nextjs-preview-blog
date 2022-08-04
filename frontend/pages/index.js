import Link from "next/link";
import Layout from "../components/layout";
import { fetchAPI } from "../lib/api";

export default function Home({ articles }) {
  return (
    <>
      <Layout>
        <body className="antialiased md:bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {articles.data.map((article) => (
              <div key={article.id} className="md:p-8 p-2 bg-white">
                <div>
                  {article.attributes.image && (
                    <img src={`http://localhost:1337${article.attributes.image.data.attributes.url}`} />
                  )}
                </div>
                {article.attributes.title}
                <div>
                  {article.category && (
                    <p className="text-indigo-500 font-semibold text-base mt-2">
                      {article.attributes.category.data.attributes.name}
                    </p>
                  )}
                </div>
                <h1 className="font-semibold text-gray-900 leading-none text-xl mt-1 capitalize truncate">
                  {article.attributes.title}
                </h1>
                <Link href={`/article/${article.attributes.slug}`}>
                  <div className="max-w-full">
                    <p className="text-base font-medium tracking-wide text-gray-600 mt-1">
                      {article.attributes.description}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center space-x-2 mt-20">
                  <div>
                    {article.attributes.author && (
                      <p className="text-gray-900 font-semibold pb-2">
                        {article.attributes.author.data.attributes.name}
                      </p>
                    )}
                    <p className="text-gray-500 font-semibold text-sm">
                      Created on - {new Date(article.attributes.createdAt).toDateString()}
                    </p>
                    <p className="text-gray-500 font-semibold text-sm">
                      Updated on - {new Date(article.attributes.updatedAt).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </body>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const articles = await fetchAPI("/articles?populate=*");;
    return {
      props: {
        articles
      },
    };
  } catch (error) {
    return { error };
  }
}