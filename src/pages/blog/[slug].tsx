import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import MDXComponents from 'components/mdx/MDXComponents'
import prisma from 'lib/prisma'
import { parseISO, format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import Config from 'main.config'
import Meta from 'components/Meta'

export default function BlogPost({ blog, mdx, recommendations }) {
    if (blog && mdx && recommendations) {
        recommendations = JSON.parse(recommendations)
        blog = JSON.parse(blog)
        const { title, description, image, slug } = blog

        return (
            <>
                <Meta
                    title={title}
                    description={description}
                    image={image}
                    canonical={process.env.NEXT_PUBLIC_URL + '/blog/' + slug}
                />
                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <Content blog={blog} mdx={mdx} />
                    <Recomendations recommendations={recommendations} />
                </div>
            </>
        )
    }
}

function Content({ blog, mdx }) {
    const { title, updatedAt } = blog

    return (
        <div className="rounded-lg bg-white p-6 text-justify text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200 md:col-span-3">
            <h1 className="mb-1 text-3xl font-medium">{title}</h1>
            <p className="mt-2 text-sm font-medium text-neutral-400">
                Last Updated @ {format(parseISO(updatedAt), 'MMMM dd, yyyy')}
            </p>
            <hr className="border-1 mt-4 mb-10 w-full border-neutral-200 dark:border-neutral-600" />
            <MDXRemote lazy {...mdx} components={MDXComponents} />
        </div>
    )
}

function Recomendations({ recommendations }) {
    return (
        <div className="col-span-1">
            {recommendations.map((rec) => {
                const { slug, author, createdAt, updatedAt, title, image } = rec

                return (
                    <div key={rec} className="mb-4 w-full">
                        <Link href={`/blog/${slug}`}>
                            <div className="w-full rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
                                <div className="relative h-40 w-full">
                                    <Image
                                        className="rounded-t-lg"
                                        src={image}
                                        alt="Blog Post Cover"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="p-5">
                                    <div className="w-full">
                                        <h5 className="mb-3 text-justify font-medium tracking-tight text-neutral-900 dark:text-white">
                                            {title}
                                        </h5>
                                        <p className="block text-sm text-neutral-700 dark:text-neutral-400">
                                            {author && author.name && (
                                                <span>{author.name}, </span>
                                            )}
                                            {format(
                                                parseISO(createdAt),
                                                'MMMM dd, yyyy'
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export async function getStaticProps({ params }) {
    const { slug } = params
    const blog = await prisma.blogPost.findUnique({ where: { slug } })
    const mdx = await serialize(blog.content)
    const recommendations = JSON.stringify(
        await prisma.blogPost.findMany({ take: 3 })
    )
    return { props: { blog: JSON.stringify(blog), mdx, recommendations } }
}

export async function getStaticPaths() {
    const blogs = await prisma.blogPost.findMany()
    const slugs = blogs.map((doc) => doc.slug)
    const paths = slugs.map((slug) => ({ params: { slug } }))

    return { paths, fallback: false }
}
