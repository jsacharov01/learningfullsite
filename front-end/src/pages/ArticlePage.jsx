import { useParams } from "react-router-dom";
import articles from "../article-content";

export default function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((article) => article.name === name);
  if (!article) {
    return <h1>Article {name} not found!</h1>;
  }
  return (
    <>
      <h1>{article.title}</h1>
      {article?.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  );
}
