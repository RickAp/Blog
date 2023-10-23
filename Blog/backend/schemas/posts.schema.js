import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string({
        required_error: "title is required"
    }),
    author: z.string({
        required_error: "author is required"
    }),
    date: z.string({
        required_error: "date is required"
    }),
    content: z.string({
        required_error: "content is required"
    }),
});