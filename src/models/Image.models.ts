import * as z from "zod"

export const BasicImageSchema = z.object({
    total_results: z.string(),
    page: z.number(),
    per_page: z.number(),
    next_page: z.string().optional(),
    prev_page: z.string().optional(),

})

export const PhotoSchema = z.object({
    id: z.number(),
    width: z.number(),
    height: z.number(),
    url: z.string(),
    src: z.object({
        large2x: z.string(),
        tiny: z.string()
    }),
    alt: z.string(),
    blurredDataUrl: z.string().optional()
})

export const PhotosListSchema = BasicImageSchema.extend({
    photos: z.array(PhotoSchema)
})

export type ImageResponse = z.infer<typeof PhotosListSchema>
export type Photo = z.infer<typeof PhotoSchema>
