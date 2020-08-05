export default interface CreatePostDTO {
  body: {
    title: string;
    content: string;
  };
  userId: string;
}
