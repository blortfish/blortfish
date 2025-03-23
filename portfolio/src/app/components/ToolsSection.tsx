export function ToolsSection() {
  return (
    <main className="flex flex-col items-center justify-start flex-grow relative text-center px-4 py-[10%]">
      <h2 className="text-3xl font-bold text-white mb-4">Tools I Work With</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-gray-300 text-lg py">
        <span>JavaScript</span>
        <span>TypeScript</span>
        <span>Node.js</span>
        <span>React</span>
        <span>GraphQL</span>
        <span>AWS</span>
        <span>Docker</span>
        <span>Terraform</span>
        <span>PostgreSQL</span>
        <span>MongoDB</span>
        <span>Redis</span>
        <span>CI/CD</span>
        <span>Nx</span>
        <span>Python</span>
        <span>Github Actions</span>
        <span>git</span>
      </div>
    </main>
  );
}

export default ToolsSection;
