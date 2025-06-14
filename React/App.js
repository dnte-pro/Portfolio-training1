import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', link: '' });

  useEffect(() => {
    const stored = localStorage.getItem('projects');
    if (stored) setProjects(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    setProjects([...projects, form]);
    setForm({ title: '', description: '', link: '' });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Project Portfolio</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 mb-10">
        <Input
          placeholder="Project Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Input
          placeholder="Link (optional)"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <Button type="submit">Add Project</Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, idx) => (
          <Card key={idx} className="shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="mt-2 text-gray-700">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View Project
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
