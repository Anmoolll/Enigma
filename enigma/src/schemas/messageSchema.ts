import {z} from 'zod'

export const messageSchema = z.object({
    content: z
    .string()
    .min(5, {message: "Message must be of atleast 5 characters"})
    .max(300, {message:"Message must be less than 300 characters"})
})