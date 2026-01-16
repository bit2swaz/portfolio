export const BodyComponent = () => {
  return (
    <section>
      <h1 className="font-semibold text-xl sm:text-2xl mb-6 sm:mb-8 tracking-tighter">
        Hey! I&apos;m Aditya (aka bit2swaz)
      </h1>
      <div className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert">
        <p>A bit about me:</p>
      </div>
      <ul className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert list-disc space-y-1.5 sm:space-y-2 my-4 sm:my-6 ml-4 sm:ml-2">
        <li>
          Backend & Systems Engineer. In love with speed, DX, and performance.
        </li>
        <li>
          I build distributed systems, storage engines, and infrastructure from scratch.
        </li>
        <li>
          My tech stack includes Rust, Go, C/C++, and various distributed systems technologies.
        </li>
        <li>
          I love building infra/devtools that blend technical depth with minimalist but clean designs.
        </li>
        <li>
          Currently diving into blockchain and low-level optimization stuff.
        </li>
      </ul>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Check out my projects above to see what I&apos;ve been building. Always open to conversations of any kind ^^
        </p>
      </div>
    </section>
  );
};
