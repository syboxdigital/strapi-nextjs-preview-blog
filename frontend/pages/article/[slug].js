import Markdown from "markdown-to-jsx";
import { fetchAPI, getPageData } from "../../lib/api";
import Layout from "../../components/layout";

const Article = ({ article, preview }) => {
  return (
    <>
      <div>
        {preview ? (
          <div className="relative bg-indigo-600">
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
              <div className="pr-16 sm:text-center sm:px-16">
                <p className="font-medium text-white">
                  <span>Preview mode is on,</span>
                  <span className="block sm:ml-2 sm:inline-block">
                    <a
                      href="http://localhost:3000/api/exit-preview"
                      className="underline hover:text-cyan transition-colors"
                    >
                      turn off
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Layout>
        <div className="mt-10">
          <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto">
            <div className="absolute left-0 bottom-0 w-full h-full" />
            <h1 className="text-6xl font-bold pb-4 text-center">{article.data[0].attributes.title}</h1>
            <div>
              {article.data[0].attributes.image && (
                <img src={`http://localhost:1337${article.data[0].attributes.image.data.attributes.url}`} />
              )}
            </div>
            <div>
              {article.data[0].attributes.category && (
                <a
                  href="#"
                  className="px-4 py-1 bg-black text-blue-200 inline-flex text-md items-center justify-center mb-2"
                >
                  {article.data[0].attributes.category.data.attributes.name}
                </a>
              )}
            </div>
            <h2 className="text-4xl pt-2 font-semibold text-gray-500 leading-tight">
              {article.data[0].attributes.description}
            </h2>
            <div className="mt-3">
              {article.data[0].attributes.author && (
                <p className="text-blue-900 font-semibold pb-2">
                  Written by - {article.data[0].attributes.author.data.attributes.name}
                </p>
              )}
            </div>
          </div>
          <article className="prose lg:prose-xl px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
            <Markdown>{article.data[0].attributes.content}</Markdown>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default Article;

export async function getStaticPaths() {
  const articles = await fetchAPI("/articles?populate=*");

  return {
    paths: articles.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = null }) {
  // const article = await fetchAPI(`/articles/?filters[slug][$eq]=${params.slug}&populate=*`);
  const article = await getPageData(params.slug, preview);

  return {
    props: { article, preview },
    revalidate: 1,
  };
}

