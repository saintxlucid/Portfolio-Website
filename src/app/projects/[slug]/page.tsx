import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ProjectFrontmatter } from '@/types';
import { Metadata } from 'next';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

async function getProjectBySlug(slug: string) {
  try {
    const filePath = path.join(projectsDirectory, `${slug}.mdx`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.summary,
      images: [project.frontmatter.cover],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <article className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-surface border border-border text-limestone"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-limestone mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-xl text-limestone/80 mb-4">{frontmatter.role}</p>

          <p className="text-limestone/60">
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {frontmatter.links && frontmatter.links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {frontmatter.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-amethyst text-bg rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          )}
        </div>

        {/* MDX Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <MDXRemote source={content} />
        </div>
      </div>
    </article>
  );
}
