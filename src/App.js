import React from "react";
import { useGlobal } from "./context";
// COMPONENTS
import Comment from "./components/Comment";
import CreateComment from "./components/CreateComment";
import DeleteModal from "./components/DeleteModal";

const App = () => {
  const { currentUser, comments, isDeleting } = useGlobal();
  return (
    <main className="bg-veryLightGray font-primary">
      <section className="container mx-auto flex min-h-screen flex-col space-y-6 px-4 py-8">
        {comments.map((comment) => {
          if (!comment.isReply)
            return <Comment key={comment.id} {...comment} />;
          return null;
        })}
        <CreateComment {...currentUser} btnValue="send" />
        {isDeleting && <DeleteModal />}
      </section>
    </main>
  );
};

export default App;
