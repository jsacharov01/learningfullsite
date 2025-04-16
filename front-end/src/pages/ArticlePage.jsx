import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import articles from "../article-content";
import axios from "axios";
import CommentsList from "../CommentsList";
import AddCommentForm from "../AddCommentForm";

export default function ArticlePage() {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments: initialComments } =
    useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  const article = articles.find((article) => article.name === name);
  if (!article) {
    return <h1>Article {name} not found!</h1>;
  }

  async function onUpvoteClicked() {
    const response = await axios.post(`/api/articles/${name}/upvote`);
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes);
  }

  async function onAddComment(nameText, commentText) {
    const response = await axios.post(`/api/articles/${name}/comments`, {
      postedBy: nameText,
      text: commentText,
    });
    const updatedArticleData = response.data;
    setComments(updatedArticleData.comments);
  }

  return (
    <>
      <h1>{article.title}</h1>
      <button onClick={onUpvoteClicked}>Upvote</button>
      <p>This article has {upvotes} upvotes</p>
      {article?.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}

      <AddCommentForm onAddComment={onAddComment} />
      <CommentsList comments={comments} />
    </>
  );
}
